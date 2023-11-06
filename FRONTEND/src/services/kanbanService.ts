import { KanbanGateway } from 'gateways/kanbanGateway';
import { Columns } from 'entities/column';
import api from 'gateways/authInterceptor';
import { Task } from 'entities/task';

export class KanbanService implements KanbanGateway {
  async getTasks(): Promise<Columns> {
    const { data } = await api.get("/task")
    return data;
  }

  async addTask(title: string, content: string, list: string): Promise<Task> {
    const { data } = await api.post("/task", {
      title,
      content,
      list
    })

    return data;
  }

  async updateTask(task: Task): Promise<Task> {
    const { data } = await api.put(`/task/${task.id}`, {
      id: task.id,
      title: task.title,
      content: task.content,
      list: task.list
    })

    return data;
  }

  async deleteTask(idTask: string): Promise<Task[]> {
    const { data: result } = await api.delete(`/task/${idTask}`)
    return result
  }

}