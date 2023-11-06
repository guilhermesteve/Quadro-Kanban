import { type Request, type Response } from 'express'
import { type AddTaskUseCase } from '../../application/use_cases/addTaskUseCase'
import { type UpdateTaskUseCase } from '../../application/use_cases/updateTaskUseCase'
import { type DeleteTaskUseCase } from '../../application/use_cases/deleteTaskUseCase'
import { type GetTasksUseCase } from '../../application/use_cases/getTasksUseCase'

export class TaskController {
  constructor (private readonly addTaskUseCase: AddTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase) {}

  getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.getTasksUseCase.execute()
      res.status(200).json(tasks)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  addTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await this.addTaskUseCase.execute(req.body)
      res.status(201).json(task.toJSON())
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { taskId } = req.params
      const task = await this.updateTaskUseCase.execute(taskId, req.body)
      res.status(200).json(task.toJSON())
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { taskId } = req.params
      const tasks = await this.deleteTaskUseCase.execute(taskId)
      return res.status(200).send(tasks)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}
