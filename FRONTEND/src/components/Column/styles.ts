import styled from 'styled-components';

export const ColumnWrapper = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  width: 260px;
  margin: 0 10px;
  padding: 10px 8px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const ColumnHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const AddCardButton = styled.button`
  background: none;
  border-radius: 3px;
  border: none;
  color: #5e6c84;
  cursor: pointer;
  padding: 10px;
  text-align: left;
  width: 100%;
  background-color: rgba(9,30,66,.05);
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(9,30,66,.08);
    
  }
`;

