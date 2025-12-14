
import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id:1, text:'Learn React', done:false }
  ]);

  const addTodo = text =>
    setTodos([...todos, { id:Date.now(), text, done:false }]);

  const toggle = id =>
    setTodos(todos.map(t => t.id===id ? {...t, done:!t.done}:t));

  const remove = id =>
    setTodos(todos.filter(t => t.id!==id));

  return (
    <div>
      <button onClick={() => addTodo('New Todo')}>Add</button>
      {todos.map(t => (
        <div key={t.id}>
          <span onClick={() => toggle(t.id)}>
            {t.done ? '✔ ' : ''}{t.text}
          </span>
          <button onClick={() => remove(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
}
