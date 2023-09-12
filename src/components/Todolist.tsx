import React, { ChangeEvent } from 'react'
import { FilterValuesType } from '../App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';

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
  changeTitle: (taskId: string, newValue: string, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => { props.changeFilter('all', props.id) }
  const onActiveClickHandler = () => { props.changeFilter('active', props.id) }
  const onCompletedClickHandler = () => { props.changeFilter('completed', props.id) }
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div className='todolist'>
      <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" size="small" onClick={removeTodolist}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {
          props.tasks.map((t) => {
            const onRemoveHandler = () => { props.removeTask(t.id, props.id) }
            const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.id)
            }
            const onTitleChangeHandler = (newValue: string) => {
              props.changeTitle(t.id, newValue, props.id)
            }

            return (
              <li
                key={t.id}
                className={t.isDone ? 'is-done' : ''}>
                <Checkbox
                  checked={t.isDone}
                  onChange={onStatusChangeHandler}
                />
                <EditableSpan
                  title={t.title}
                  onChange={onTitleChangeHandler}
                />
                <IconButton aria-label="delete" size="small" onClick={onRemoveHandler}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </li>
            )
          })
        }
      </ul>
      <div>
        <Button
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >All</Button>
        <Button
          color='success'
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}>Active</Button>
        <Button
          color='error'
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}>Completed</Button>
      </div>
    </div>
  )
}