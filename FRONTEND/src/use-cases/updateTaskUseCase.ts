import { KanbanService } from 'services/kanbanService';
import { Task } from 'entities/task';

export class UpdateTaskUseCase {
    constructor(private kanbanService: KanbanService) { }

    async execute(task: Task): Promise<Task> {
        const tasks = await this.kanbanService.updateTask(task)
        return tasks
    }
}