import React, { useEffect, useState } from 'react';
import { Task } from 'entities/task';
import TaskComponent from 'components/Task';

import { ColumnWrapper, ColumnHeader, AddCardButton } from './styles';


interface ColumnComponentProps {
  name: string;
  tasks: Task[];
  moveTask: (taskId: string, sourceColumn: string, destinationColumn: string) => void;
  addTask: (columnName : string, newTask: Task) => void;
  deleteTask: (columnName : string, taskId :  string) => void;

}

const ColumnComponent: React.FC<ColumnComponentProps> = ({ name, tasks, moveTask, addTask, deleteTask }) => {
  const [localTasks, setLocalTasks] = useState<Task[]>(tasks);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const columnIndex = ['ToDo', 'Doing', 'Done'].indexOf(name);


  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleAddTaskToggle = (show: boolean) => {
    setIsAddingTask(show);
  };

  const handleAddTask = (newTask: Task) => {
    addTask(name, newTask)
    handleAddTaskToggle(false);
  };


  const handleDeleteTask = (idTask: string) => {
    deleteTask(name, idTask)
  }

  const handleMove = (taskId: string, direction: 'left' | 'right') => {
    const columnOrder = ['ToDo', 'Doing', 'Done'];
    const targetColumnIndex = direction === 'left' ? columnIndex - 1 : columnIndex + 1;

    if (targetColumnIndex >= 0 && targetColumnIndex < columnOrder.length) {
      const targetColumn = columnOrder[targetColumnIndex];
      moveTask(taskId, name, targetColumn);
    }
  };

  return (
    <ColumnWrapper>
      <ColumnHeader>{name}</ColumnHeader>
      {localTasks.map((task) => (
        <TaskComponent
          key={task.id}
          task={task}
          onSave={handleAddTask}
          onDelete={handleDeleteTask}
          onMove={handleMove}
          columnIndex={columnIndex}
        />
      ))}

      {isAddingTask ? (
        <TaskComponent
          task={{ id: '', title: '', content: '', list: name }}
          isEditable={true}
          onSave={handleAddTask}
          onCancel={() => handleAddTaskToggle(false)}
          columnIndex={columnIndex}

        />
      ) : (
        <AddCardButton onClick={() => handleAddTaskToggle(true)}>
          + adicionar tarefa
        </AddCardButton>
      )}
    </ColumnWrapper>
  );
};

export default ColumnComponent;