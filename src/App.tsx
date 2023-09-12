import React, { useState } from 'react'
import { Todolist, TaskType } from './components/Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './components/AddItemForm'
import './App.css'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(el => el.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find((t) => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }

  function changeTitle(taskId: string, newValue: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find((t) => t.id === taskId)
    if (task) {
      task.title = newValue
      setTasks({ ...tasksObj })
    }
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolist(filteredTodolist)

    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolist([...todolists])
    }
  }

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      title: title,
      filter: 'all',
    }
    setTodolist([todolist, ...todolists])
    setTasks({ ...tasksObj, [todolist.id]: [] })
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What is learn', filter: 'all' },
    { id: todolistId2, title: 'What is buy', filter: 'all' },
  ])

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'REDUX', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: true },
    ]
  })

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid
          container
          style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map((tl) => {
              let taskForTodolist = tasksObj[tl.id];
              if (tl.filter === 'completed') {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
              }
              if (tl.filter === 'active') {
                taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
              }
              return (
                <Grid item>
                  <Paper
                    style={{ padding: "10px" }}
                    elevation={3}>
                    <Todolist
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      changeTitle={changeTitle}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
