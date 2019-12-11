import React from 'react'

const initialTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: true,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: 'c',
    task: 'Learn GraphQL',
    complete: false,
  },
]

const App = () => (
  <div>
    <ul>
      {initialTodos.map(todo => (
        <li key={todo.id}>
          <label>{todo.task}</label>
        </li>
      ))}
    </ul>
  </div>
)

export default App
