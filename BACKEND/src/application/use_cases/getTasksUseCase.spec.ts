import { TaskRepositoryInMemory } from '../../../tests/mocks/taskRepositoryInMemory'
import { Task, eTaskListOption } from '../../domain/entities/task'
import { type ITaskRepository } from '../../domain/interfaces/iTaskRepository'
import { GetTasksUseCase } from './getTasksUseCase'

describe('GetTasksUseCase', () => {
  const makeSut = (): { getTasksUseCase: GetTasksUseCase, mockRepository: ITaskRepository } => {
    const mockRepository = new TaskRepositoryInMemory()
    const getTasksUseCase = new GetTasksUseCase(mockRepository)
    return { getTasksUseCase, mockRepository }
  }

  it('should return an array of tasks', async () => {
    const { getTasksUseCase, mockRepository } = makeSut()

    const dataTask1 = {
      title: 'task1',
      content: ' content 1',
      list: eTaskListOption.todo
    }

    const dataTask2 = {
      title: 'task2',
      content: ' content 2',
      list: eTaskListOption.doing
    }

    const task1 = new Task(dataTask1)
    const task2 = new Task(dataTask2)

    await mockRepository.addTask(task1)
    await mockRepository.addTask(task2)

    const tasks = await getTasksUseCase.execute()

    expect(tasks).toHaveLength(2)
    expect(tasks).toContainEqual(task1)
    expect(tasks).toContainEqual(task2)
  })
})
