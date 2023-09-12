import { ChangeEvent, useState } from "react"
import TextField from '@mui/material/TextField'

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  function activateEditMode() {
    setEditMode(true)
    setTitle(props.title)
  }
  function activateViewMode() {
    setEditMode(false)
    props.onChange(title);
  }
  function onChangeTitleHandler(e: ChangeEvent<HTMLInputElement>) { setTitle(e.currentTarget.value) }

  return editMode
    ? <TextField
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      value={title}
      variant="standard"
      autoFocus />
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}