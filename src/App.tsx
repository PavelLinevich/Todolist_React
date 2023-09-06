import React from 'react';
import { Todolist } from './components/Todolist';
import './App.css';

let tasks1 = [
  { id: 1, title: 'HTML&CSS', isDone: true },
  { id: 1, title: 'JS', isDone: true },
  { id: 1, title: 'React', isDone: false },
]
let tasks2 = [
  { id: 1, title: 'Terminator', isDone: true },
  { id: 1, title: 'XXX', isDone: false },
  { id: 1, title: 'One', isDone: false },
]

function App() {
  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks1} />
      <Todolist title="What to watch" tasks={tasks2} />
    </div>
  );
}

export default App;
