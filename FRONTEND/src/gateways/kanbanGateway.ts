import { Columns } from 'entities/column';
import { Task } from 'entities/task';

export interface KanbanGateway {
  getTasks(): Promise<Columns>;
  addTask(title: string, content: string, list: string): Promise<Task>
  updateTask(task: Task): Promise<Task>
  deleteTask(idTask: string): Promise<Task[]>
}