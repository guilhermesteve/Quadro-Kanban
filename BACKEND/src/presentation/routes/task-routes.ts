/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { AddTaskUseCase } from '../../application/use_cases/addTaskUseCase'
import { TaskRepositoryInMemory } from '../../../tests/mocks/taskRepositoryInMemory'
import { TaskController } from '../controllers/taskController'
import { UpdateTaskUseCase } from '../../application/use_cases/updateTaskUseCase'
import { DeleteTaskUseCase } from '../../application/use_cases/deleteTaskUseCase'
import { GetTasksUseCase } from '../../application/use_cases/getTasksUseCase'

export const taskRouter = Router()
const taskRepository = new TaskRepositoryInMemory()
const addTaskUseCase = new AddTaskUseCase(taskRepository)
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository)
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)
const getTasksUseCase = new GetTasksUseCase(taskRepository)
const taskController = new TaskController(addTaskUseCase, updateTaskUseCase, deleteTaskUseCase, getTasksUseCase)

taskRouter.get('/task', taskController.getTasks)
taskRouter.post('/task', taskController.addTask)
taskRouter.put('/task/:taskId', taskController.updateTask)
taskRouter.delete('/task/:taskId', taskController.deleteTask)
