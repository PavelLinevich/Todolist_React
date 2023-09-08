import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { FilterValuesType } from '../App'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState('')

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim(), props.id)
      setNewTaskTitle('');
    } else {
      setNewTaskTitle('');
      setError('Title is required')
    }
  }
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('')
    if (e.key === 'Enter') {
      addTask()
    }
  }
  const onAllClickHandler = () => { props.changeFilter('all', props.id) }
  const onActiveClickHandler = () => { props.changeFilter('active', props.id) }
  const onCompletedClickHandler = () => { props.changeFilter('completed', props.id) }
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  return (
    <div>
      <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map((t) => {
            const onRemoveHandler = () => { props.removeTask(t.id, props.id) }

            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.id)
            }

            return (
              <li
                key={t.id}
                className={t.isDone ? 'is-done' : ''}>
                <input
                  type="checkbox"
                  checked={t.isDone}
                  onChange={onStatusChangeHandler}
                />
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >All</button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}>Active</button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}