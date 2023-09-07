import React, { useState } from 'react'
import { Todolist } from './components/Todolist'
import { v1 } from 'uuid'
import './App.css'

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'REDUX', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all')

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  let taskForTodolist = tasks;
  if (filter === 'completed') {
    taskForTodolist = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'active') {
    taskForTodolist = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={taskForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
