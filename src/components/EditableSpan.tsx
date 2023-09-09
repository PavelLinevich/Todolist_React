import { ChangeEvent, useState } from "react"


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
    ? <input onChange={onChangeTitleHandler} onBlur={activateViewMode} value={title} autoFocus />
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}