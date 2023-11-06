import { type Task } from '../../domain/entities/task'
import { type ITaskRepository } from '../../domain/interfaces/iTaskRepository'

export class DeleteTaskUseCase {
  private readonly taskRepository: ITaskRepository

  constructor (taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository
  }

  async execute (taskId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.deleteTask(taskId)
    return tasks
  }
}
