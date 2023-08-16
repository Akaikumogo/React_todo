import "../css/main.css";
import { useState, useEffect } from "react";

export default function App() {
  const [newItem, setnewItem] = useState(" ");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currectTodos) => {
      return [
        ...currectTodos,
        { id: crypto.randomUUID(), title: newItem, complated: false },
      ];
    });
    setnewItem("");
  }
  function toggleTodo(id, complated) {
    setTodos((currectTodos) => {
      return currectTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complated };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currectTodos) => {
      return currectTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <>
      <div className="scren">
        <form onSubmit={handleSubmit} className="add-new-item">
          <div className="form">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setnewItem(e.target.value)}
              id="item"
              required
              pattern=".{1,}"
              placeholder="Nima ish rejalashtirdingiz"
            />
          </div>
          <button className="button">Add</button>
        </form>
        <hr></hr>
        <h1 className="header">Todo list</h1>
        <ul className="list">
          {todos.length === 0 && <div>No Todos</div>}
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.complated}
                    onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                  />
                  {todo.title}
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="button danger-btn"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
