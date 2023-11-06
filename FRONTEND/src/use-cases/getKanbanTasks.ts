import { KanbanService } from 'services/kanbanService';

export class GetKanbanTasks {
    constructor(private kanbanService: KanbanService) { }

    async execute(): Promise<unknown> {
        const tasks = this.kanbanService.getTasks()
        return tasks
    }
}