import KanbanBoard from 'containers/KanbanBoard';

import { Task } from 'entities/task';
import React, { useEffect, useState } from 'react';
import { KanbanService } from 'services/kanbanService';
import { GetKanbanTasks } from 'use-cases/getKanbanTasks';
import { GreenBackground, Title } from './styles';
import { Columns } from 'entities/column';

const kanbanService = new KanbanService();
const getKanbanTasksUseCase = new GetKanbanTasks(kanbanService);

const KanbanBoardPage: React.FC = () => {
  const [columns, setColumns] = useState<Columns>({ todo: [], doing: [], done: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getKanbanTasksUseCase.execute() as Task[];
        const columns = tasks.reduce((cols: Columns, task: Task) => {
          const { list } = task;
          if (!cols[list]) {
            cols[list] = [];
          }
          cols[list].push(task);
          return cols;
        }, {});
        setColumns(columns);
      } catch (err) {
        setError('Erro ao carregar tarefas');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar as tarefas: {error}</div>;
  }

  return (
    <GreenBackground>
      <Title>Quadro de Tarefas</Title>
      <KanbanBoard columns={columns} />
    </GreenBackground>
  );
};

export default KanbanBoardPage;