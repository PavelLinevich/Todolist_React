import React, { useState } from 'react';
import { Todolist } from './components/Todolist';
import './App.css';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
    { id: 4, title: 'REDUX', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all')

  function removeTask(id: number) {
    let filteredTasks = tasks.filter(el => el.id !== id)
    setTasks(filteredTasks)
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
      />
    </div>
  );
}

export default App;
