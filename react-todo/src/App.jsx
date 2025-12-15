import React from "react";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>React Todo App</h1>
      <TodoList />
    </div>
  );
}
