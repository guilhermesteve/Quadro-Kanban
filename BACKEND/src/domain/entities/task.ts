import { v4 as uuidv4 } from 'uuid'

export type TaskListOption = 'ToDo' | 'Doing' | 'Done'

export enum eTaskListOption {
  todo = 'ToDo',
  doing = 'Doing',
  done = 'Done'
}

export interface ITaskConstructorParams {
  title: string
  content: string
  list: string
  id?: string
}

export class Task {
  private readonly _id: string
  private _title: string
  private _content: string
  private _list: TaskListOption

  constructor ({ id, title, content, list }: ITaskConstructorParams) {
    this._title = title
    this._content = content
    this._list = this.validationList(list as TaskListOption)
    this._id = id ?? uuidv4()
  }

  get id (): string {
    return this._id
  }

  get title (): string {
    return this._title
  }

  set title (value: string) {
    this._title = value
  }

  get content (): string {
    return this._content
  }

  set content (value: string) {
    this._content = value
  }

  get list (): TaskListOption {
    return this._list
  }

  private validationList (value: TaskListOption): TaskListOption {
    const validOptions: TaskListOption[] = ['ToDo', 'Doing', 'Done']
    if (!validOptions.includes(value)) {
      throw new Error('Invalid list option')
    }
    return value
  }

  update (newData: Partial<Task>): void {
    if (newData.title !== undefined) {
      this._title = newData.title
    }
    if (newData.content !== undefined) {
      this._content = newData.content
    }
    if (newData.list !== undefined) {
      this._list = this.validationList(newData.list)
    }
  }

  toJSON (): { id: string, title: string, content: string, list: string } {
    return {
      id: this._id,
      title: this._title,
      content: this._content,
      list: this._list
    }
  }
}
