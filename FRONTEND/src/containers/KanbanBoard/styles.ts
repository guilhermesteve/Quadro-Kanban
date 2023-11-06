import styled from 'styled-components';

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  gap: 8px;
  overflow-x: auto;
  height: calc(100vh - 100px); 
`;

export const KanbanBoardContainer = styled.div`
  display: flex;
  align-items: start;
  overflow-x: auto;
  padding: 20px;
  height: calc(100vh - 80px);
  background-color: #4CAF50;
  background-size: cover;
`;