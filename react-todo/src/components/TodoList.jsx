import React from "react";
import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false }
  ]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <AddTodoForm addTodo={addTodo} />

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={todo.completed ? "completed" : ""}
            style={{ cursor: "pointer" }}
          >
            {todo.text}

            <button onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
