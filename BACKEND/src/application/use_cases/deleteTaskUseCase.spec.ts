import { TaskRepositoryInMemory } from '../../../tests/mocks/taskRepositoryInMemory'
import { Task, eTaskListOption } from '../../domain/entities/task'
import { type ITaskRepository } from '../../domain/interfaces/iTaskRepository'
import { DeleteTaskUseCase } from './deleteTaskUseCase'

describe('DeleteTaskUseCase', () => {
  const makeSut = (): { deleteTaskUseCase: DeleteTaskUseCase, mockRepository: ITaskRepository } => {
    const mockRepository = new TaskRepositoryInMemory()
    const deleteTaskUseCase = new DeleteTaskUseCase(mockRepository)
    return { deleteTaskUseCase, mockRepository }
  }

  it('should return an array of tasks', async () => {
    const { deleteTaskUseCase, mockRepository } = makeSut()

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

    const tasks = await deleteTaskUseCase.execute(task1.id)

    expect(tasks).toHaveLength(1)
    expect(tasks).not.toContainEqual(task1)
    expect(tasks).toContainEqual(task2)
  })
})
