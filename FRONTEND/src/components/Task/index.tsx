import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Task } from 'entities/task';


import { ActionButton, ConfirmationWrapper, DeleteButton, EditButton, ErrorMessage, MoveButton, StyledInput, StyledTextArea, TaskBottom, TaskBottomMoveAction, TaskCard, TaskHeader, Title } from './styles';
import { AddTaskUseCase } from 'use-cases/addTaskUseCase';
import { KanbanService } from 'services/kanbanService';
import { UpdateTaskUseCase } from 'use-cases/updateTaskUseCase';
import { DeleteTaskUseCase } from 'use-cases/deleteTaskUseCase';
import TextMarkdown from 'components/TextMarkdown';



interface TaskComponentProps {
  task: Task;
  columnIndex: number
  isEditable?: boolean
  onSave?: (task: Task) => void;
  onCancel?: () => void;
  onDelete?: (idTask: string) => void;
  onMove?: (idTask: string, direction: 'left' | 'right') => void
}

const kanbanService = new KanbanService()
const addTaksUseCase = new AddTaskUseCase(kanbanService);
const updateTaskUseCase = new UpdateTaskUseCase(kanbanService);
const deleteUseCase = new DeleteTaskUseCase(kanbanService)


const TaskComponent: React.FC<TaskComponentProps> = ({ task, isEditable, columnIndex, onSave, onCancel, onDelete, onMove }) => {

  const [editableTask, setEditableTask] = useState(task);
  const [originalTask, setOriginalTask] = useState(task);
  const [errors, setErrors] = useState({ msg: '' });

  const [isEditing, setIsEditing] = useState(isEditable);

  const [isDeleting, setIsDeleting] = useState(false);

  const [textoConfirmDelete] = useState("Deseja excluir esse registro?")


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableTask((prevTask) => ({ ...prevTask, [name]: value }));
  };


  const validateTask = () => {
    const tempErrors = { msg: '' };
    let isValid = true;

    if (!editableTask.title.trim()) {
      tempErrors.msg = 'O <strong>título </strong> é obrigatório. </br>';
      isValid = false;
    }

    if (!editableTask.content.trim()) {
      tempErrors.msg += 'A <strong> descrição</strong> é obrigatória.  </br>';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSave = async () => {

    if (!validateTask()) {
      return;
    }

    const { id, title, content, list } = editableTask

    let newTask

    if (id) {
      newTask = await updateTaskUseCase.execute({ id, title, content, list });
      setIsEditing(false);
    } else {
      newTask = await addTaksUseCase.execute(title, content, list);
    }

    onSave?.(newTask)
    setEditableTask(newTask)

  };

  const handleEdit = () => {
    setOriginalTask(editableTask)
    setIsEditing(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUseCase.execute(editableTask.id)

    onDelete?.(editableTask.id)
    setIsDeleting(false)

  };

  const handleMove = async (direction : "left" | "right") => {

    const columnOrder = ['ToDo', 'Doing', 'Done'];
    const targetColumnIndex = direction === 'left' ? columnIndex - 1 : columnIndex + 1;
    const targetColumn = columnOrder[targetColumnIndex];

   
    await updateTaskUseCase.execute({  ...editableTask, list: targetColumn });
    
    onMove?.(editableTask.id, direction)
  }

  const handleCancel = () => {

    if (originalTask.id) {
      setEditableTask(originalTask);
      setIsEditing(false);
    }
    onCancel?.();
  };


  if (isEditing) {

    const createMarkup = (htmlString: string) => {
      return { __html: htmlString };
    };

    return (
      <>
        <TaskCard>
          <StyledInput
            name='title'
            value={editableTask.title}
            onChange={handleChange}
            placeholder="Titulo"
          />
          <StyledTextArea
            name="content"
            value={editableTask.content}
            onChange={handleChange}
            placeholder="Descrição"
          />
          {errors.msg &&  <ErrorMessage dangerouslySetInnerHTML={createMarkup(errors.msg)} />}
          <ActionButton onClick={handleSave}>Salvar</ActionButton>
          <ActionButton variant="cancel" onClick={handleCancel}>Cancelar</ActionButton>
        </TaskCard>
      </>
    );
  }

  const showDeleting = () => {
    return (<>
      <TaskHeader>
        <Title>{textoConfirmDelete}</Title>
      </TaskHeader>

      <ConfirmationWrapper>
        <ActionButton onClick={handleConfirmDelete}>Confirmar</ActionButton>
        <ActionButton variant="cancel" onClick={() => setIsDeleting(false)}>Cancelar</ActionButton>
      </ConfirmationWrapper>
    </>)
  }


  return (
    <>
      <TaskCard>
        {isDeleting ? showDeleting() : (
          <>
            <TaskHeader>
              <Title>{editableTask.title}</Title>
              <EditButton onClick={handleEdit} title="Editar Tarefa">
                <FaEdit size={20} color="gray" />
              </EditButton>
            </TaskHeader>
            <TextMarkdown content={editableTask.content}/>
            <TaskBottom>

              <DeleteButton onClick={() => setIsDeleting(true)}  >
                <FaTrash size={12} color="gray" />
              </DeleteButton>

              <TaskBottomMoveAction>

                {columnIndex > 0 && (
                  <MoveButton onClick={() => handleMove("left")}>{"<"}</MoveButton>
                )}
                {columnIndex < 2 && ( 
                  <MoveButton onClick={() => handleMove("right")}>{">"}</MoveButton>
                )}

              </TaskBottomMoveAction>
            </TaskBottom>
          </>
        )
        }

      </TaskCard>

    </>
  );
};

export default TaskComponent;