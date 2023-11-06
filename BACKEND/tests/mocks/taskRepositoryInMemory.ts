import { type Task } from '../../src/domain/entities/task'
import { type ITaskRepository } from '../../src/domain/interfaces/iTaskRepository'

export class TaskRepositoryInMemory implements ITaskRepository {
  private tasks: Task[] = []

  async getTasks (): Promise<Task[]> {
    const tasks = this.tasks
    return tasks
  }

  async addTask (task: Task): Promise<Task> {
    this.tasks.push(task)
    return task
  }

  async updateTask (taskId: string, newData: Partial<Task>): Promise<Task> {
    const task = await this.findById(taskId)
    if (task == null) {
      throw new Error('Task not found')
    }

    task.update(newData)
    return task
  }

  async deleteTask (taskId: string): Promise<Task[]> {
    const tasks = this.tasks.filter(task => task.id !== taskId)
    this.tasks = tasks

    return this.tasks
  }

  async findById (id: string): Promise<Task | null> {
    const task = this.tasks.find(task => task.id === id)
    return task ?? null
  }
}
