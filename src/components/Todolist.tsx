import React from 'react'
import { FilterValuesType } from '../App'

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: number) => void
  changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map((el) => {
            return (
              <li key={el.id}>
                <input type="checkbox" defaultChecked={el.isDone} />
                <span>{el.title}</span>
                <button onClick={() => { props.removeTask(el.id) }}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button onClick={() => { props.changeFilter('all') }}>All</button>
        <button onClick={() => { props.changeFilter('active') }}>Active</button>
        <button onClick={() => { props.changeFilter('completed') }}>Completed</button>
      </div>
    </div>
  )
}