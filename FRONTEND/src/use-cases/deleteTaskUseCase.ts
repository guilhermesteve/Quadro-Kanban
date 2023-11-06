import { KanbanService } from 'services/kanbanService';
import { Task } from 'entities/task';

export class DeleteTaskUseCase {
    constructor(private kanbanService: KanbanService) { }

    async execute(idTask: string): Promise<Task[]> {
        const tasks = await this.kanbanService.deleteTask(idTask)
        return tasks
    }
}