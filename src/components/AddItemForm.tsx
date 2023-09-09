import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState('')
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim())
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

  return (
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
  )
}