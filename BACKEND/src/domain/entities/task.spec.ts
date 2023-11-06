import { Task, type ITaskConstructorParams } from './task'
import { validate as uuidValidate } from 'uuid'

const makeSUT = (params?: Partial<ITaskConstructorParams>): Task => {
  const defaultParams: ITaskConstructorParams = {
    title: 'Default Title',
    content: 'Default Content',
    list: 'ToDo',
    ...params
  }

  return new Task(defaultParams)
}

describe('Task Entity', () => {
  it('should create a task with a title, content, and valid list option', () => {
    const sut = makeSUT({
      title: 'New Task',
      content: 'Task content',
      list: 'ToDo',
      id: 'unique-id'
    })

    expect(sut).toBeInstanceOf(Task)
    expect(sut.id).toBe('unique-id')
    expect(sut.title).toBe('New Task')
    expect(sut.content).toBe('Task content')
    expect(sut.list).toBe('ToDo')
  })

  it('should fail when setting an invalid list option', () => {
    expect(() => {
      makeSUT({
        list: 'invalidOption'
      })
    }).toThrow('Invalid list option')
  })

  it('should generate a UUID for the task if no id is provided', () => {
    const sut = makeSUT()
    expect(sut.id).toBeDefined()
    expect(uuidValidate(sut.id)).toBe(true)
  })
})
