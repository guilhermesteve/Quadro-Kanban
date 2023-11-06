import { type Task } from '../../domain/entities/task'
import { type ITaskRepository } from '../../domain/interfaces/iTaskRepository'

export class UpdateTaskUseCase {
  private readonly taskRepository: ITaskRepository

  constructor (taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository
  }

  async execute (taskId: string, newData: Partial<Task>): Promise<Task> {
    const updatedTask = await this.taskRepository.updateTask(taskId, newData)
    return updatedTask
  }
}
