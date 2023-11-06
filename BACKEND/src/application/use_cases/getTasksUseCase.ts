import { type Task } from '../../domain/entities/task'
import { type ITaskRepository } from '../../domain/interfaces/iTaskRepository'

export class GetTasksUseCase {
  private readonly taskRepository: ITaskRepository

  constructor (taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository
  }

  async execute (): Promise<Task[]> {
    const updatedTask = await this.taskRepository.getTasks()
    return updatedTask
  }
}
