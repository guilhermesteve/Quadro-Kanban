import { TaskRepositoryInMemory } from '../../../tests/mocks/taskRepositoryInMemory'
import { Task } from '../../domain/entities/task'
import { type ITaskRepository } from '../../domain/interfaces/iTaskRepository'
import { UpdateTaskUseCase } from './updateTaskUseCase'

describe('UpdateTaskUseCase', () => {
  const makeSut = (): { updateTaskUseCase: UpdateTaskUseCase, mockRepository: ITaskRepository } => {
    const mockRepository = new TaskRepositoryInMemory()
    const updateTaskUseCase = new UpdateTaskUseCase(mockRepository)
    return { updateTaskUseCase, mockRepository }
  }

  it('should successfully update a task', async () => {
    const { updateTaskUseCase, mockRepository } = makeSut()

    const title = 'Test Task'
    const content = 'Test Content'
    const list = 'ToDo'

    const task = new Task({ title, content, list })
    await mockRepository.addTask(task)

    const newData: Partial<Task> = { title: 'Updated Task', content: 'Updated Content', list: 'Done' }
    const updatedTask = await updateTaskUseCase.execute(task.id, newData)

    expect(updatedTask).toMatchObject(newData)
  })

  it('should successfully update a task on an parameter', async () => {
    const { updateTaskUseCase, mockRepository } = makeSut()

    const title = 'Test Task'
    const content = 'Test Content'
    const list = 'ToDo'

    const task = new Task({ title, content, list })
    await mockRepository.addTask(task)

    const newData: Partial<Task> = { title: 'Updated Task' }
    const updatedTask = await updateTaskUseCase.execute(task.id, newData)

    expect(updatedTask).toMatchObject(newData)
  })
})
