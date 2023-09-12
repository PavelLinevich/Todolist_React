import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

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
    <div className='addItemForm'>
      <TextField
        error={!!error}
        helperText={error}
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        label="Type value"
        variant="standard"
      />
      <Button
        onClick={addTask}
        variant='contained'
        color='primary'
        size="small"
      >+</Button>
    </div>
  )
}