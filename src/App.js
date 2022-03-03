/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [editId, setEditId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId && todo !== "") {
      const editTodo = todos.find((item) => item.id === editId);

      const updatedTodos = todos.map((item) =>
        item.id === editTodo.id
          ? { id: item.id, todo: todo }
          : { id: item.id, todo: item.todo }
      );

      setTodos(updatedTodos);
      setEditId("");
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((item) => item.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "Edit" : "Go"}</button>
        </form>

        <ul className="all-todos">
          {todos.map((item) => (
            <li className="todo-item" key={item.id}>
              <span className="todo-item-text">{item.todo}</span>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
