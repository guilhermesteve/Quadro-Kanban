import { KanbanService } from 'services/kanbanService';
import { Task } from 'entities/task';

export class AddTaskUseCase {
    constructor(private kanbanService: KanbanService) { }

    async execute(title: string, content: string, list: string): Promise<Task> {
        const tasks = await this.kanbanService.addTask(title, content, list)
        return tasks
    }
}