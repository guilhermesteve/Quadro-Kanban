import { Task } from '../../domain/entities/task'
import { type ITaskRepository } from '../../domain/interfaces/iTaskRepository'

export interface IAddTaskUseCase {
  title: string
  content: string
  list: string
}

export class AddTaskUseCase {
  private readonly taskRepository: ITaskRepository

  constructor (taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository
  }

  async execute ({ title, content, list }: IAddTaskUseCase): Promise<Task> {
    const task = new Task({ title, content, list })
    await this.taskRepository.addTask(task)
    return task
  }
}
