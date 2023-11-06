import { TaskRepositoryInMemory } from '../../../tests/mocks/taskRepositoryInMemory'
import { Task } from '../../domain/entities/task'
import { type ITaskRepository } from '../../domain/interfaces/iTaskRepository'
import { AddTaskUseCase } from './addTaskUseCase'

describe('AddTask UseCase', () => {
  const makeSut = (): { addTask: AddTaskUseCase, mockRepository: ITaskRepository } => {
    const mockRepository = new TaskRepositoryInMemory()
    const addTask = new AddTaskUseCase(mockRepository)
    return { addTask, mockRepository }
  }

  it('should create a task and return it', async () => {
    const { addTask, mockRepository } = makeSut()

    const repositorySpy = jest.spyOn(
      mockRepository, 'addTask')

    const title = 'Test Task'
    const content = 'Test Content'
    const list = 'ToDo'

    const createdTask = await addTask.execute({ title, content, list })

    expect(createdTask).toBeInstanceOf(Task)
    expect(createdTask).toHaveProperty('id')
    expect(createdTask.title).toEqual(title)
    expect(createdTask.content).toEqual(content)
    expect(createdTask.list).toEqual(list)
    expect(repositorySpy).toHaveBeenCalledWith(createdTask)
  })
})
