import styled from 'styled-components';

export const TaskCard = styled.div`
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  padding: 0px 8px 8px 8px;
  margin-bottom: 8px;
  
  &:hover {
    background-color: #f4f5f7;
  }
`;

export const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h4`
`;



export const StyledInput = styled.input`
  width: 95%;
  padding: 5px;
  margin: 10px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0px 4px 15px rgba(0, 120, 0, 0.2); 
  }
`;

interface TextAreaProps {
  variant?: 'viewOnly' | 'edit';
}

export const StyledTextArea = styled.textarea<TextAreaProps>`

  width: 95%; 
  padding: 5px 10px;
  margin: 10px 0;
  display: inline-block;
  border:  1px solid #cbcbcb; 
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  resize: vertical;
  height: 100px; 
  background-color: ${(props) => props.variant === 'viewOnly' ? 'inherit' : 'none'};

  &:focus {
    outline: none;
  
    box-shadow:${(props) => props.variant === 'viewOnly' ? 'none' : '1px solid #ccc 0px 4px 15px rgba(0, 120, 0, 0.2);'};  
  }
`;


interface ActionButtonProps {
  variant?: 'cancel' | 'save';
}

export const ActionButton = styled.button<ActionButtonProps>`
    background-color:  ${(props) => props.variant === 'cancel' ? 'grey' : 'green'}; ; 
    border: none;
    color: white;
    padding: 8px 16px; 
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px; 
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition-duration: 0.4s; 
    &:hover {
      opacity: 0.8;/
    }
`;

export const EditButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
   opacity:0.8 ;
 }
`;

export const DeleteButton = styled.button`
 background: transparent;
 padding: 10px 20px 10px 0;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 &:hover {
   opacity:0.8 ;
 }
 
`;


export const TaskBottom = styled.div`
  width: 100%; 
  display: flex;
  justify-content: space-between; 
  align-items: center; 
`;

export const TaskBottomMoveAction = styled.div`
  width: 100%; 
  display: flex;
  align-items: center; 
  justify-content: end;
`;

export const ConfirmationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px 10px ;
`;

export const MoveButton = styled.button`
  background-color: #f0f0f0; 
  color: #333; 
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e0e0e0; 
  }

  &:active {
    transform: scale(0.98); 
  }

  &:focus {
    outline: none; 
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  background-color: #ffdddd;
  border-left: 6px solid #f44336; 
  margin: 10px 0;
  padding: 10px 20px;
  color: #f44336; 
  font-size: 14px;
  border-radius: 4px;
`;