import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from '../App'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const addTask = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle('');
  }
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }
  const onAllClickHandler = () => { props.changeFilter('all') }
  const onActiveClickHandler = () => { props.changeFilter('active') }
  const onCompletedClickHandler = () => { props.changeFilter('completed') }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button
          onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map((el) => {
            const onRemoveHandler = () => { props.removeTask(el.id) }

            return (
              <li key={el.id}>
                <input type="checkbox" defaultChecked={el.isDone} />
                <span>{el.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}