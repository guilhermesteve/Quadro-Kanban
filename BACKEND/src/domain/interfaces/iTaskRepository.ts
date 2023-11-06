import { type Task } from '../entities/task'

export interface ITaskRepository {
  getTasks: () => Promise<Task[]>
  addTask: (task: Task) => Promise<Task>
  updateTask: (taskId: string, newData: Partial<Task>) => Promise<Task>
  deleteTask: (taskId: string) => Promise<Task[]>
  findById: (id: string) => Promise<Task | null>
}
