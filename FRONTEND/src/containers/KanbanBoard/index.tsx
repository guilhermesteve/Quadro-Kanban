

import React, { useState } from 'react';
import { Task } from 'entities/task';
import ColumnComponent from 'components/Column';
import { BoardWrapper, KanbanBoardContainer } from './styles';
import { Columns } from 'entities/column';

interface KanbanBoardProps {
  columns: Columns; 
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns }) => {

  const defaultColumns: Columns = {
    'ToDo': [],
    'Doing': [],
    'Done': [],
  };

  const [allColumns, setAllColumns] = useState<Columns>({
    ...defaultColumns,
    ...columns
  });


  const moveTask = (taskId: string, sourceColumn: string, destinationColumn: string) => {
    setAllColumns((prevColumns) => {
      const sourceTasks = prevColumns[sourceColumn].filter(task => task.id !== taskId);
      const task = prevColumns[sourceColumn].find(task => task.id === taskId);
      if (!task) return prevColumns;

      const destinationTasks = [...prevColumns[destinationColumn], { ...task, list: destinationColumn }];
      return {
        ...prevColumns,
        [sourceColumn]: sourceTasks,
        [destinationColumn]: destinationTasks,
      };
    });
  };


  const addTaskToColumn = (columnName : string, newTask: Task) => {
    const oldcolumn =  allColumns[columnName].filter(task => task.id !== newTask.id)

    setAllColumns(prevColumns => ({
      ...prevColumns,
      [columnName]: [...oldcolumn, newTask]
    }));
  };

  const deleteTaskFromColumn = (columnName : string, taskId :  string) => {
    setAllColumns(prevColumns => ({
      ...prevColumns,
      [columnName]: prevColumns[columnName].filter(task => task.id !== taskId)
    }));
  };


  return (
    <KanbanBoardContainer>

      <BoardWrapper>
        {Object.entries(allColumns).map(([columnName, tasks]) => (
          <ColumnComponent 
          key={columnName} 
          name={columnName} 
          tasks={tasks} 
          moveTask={moveTask}
          addTask={addTaskToColumn}
          deleteTask={deleteTaskFromColumn}
          />
        ))}
      </BoardWrapper>
    </KanbanBoardContainer>
  );
};

export default KanbanBoard;