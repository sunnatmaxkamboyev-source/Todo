import { useEffect, useState } from "react";
import "./TodoApp.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos) as Todo[];
    }

    return [];
  });

  const [input, setInput] = useState<string>("");

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  
  const addTodo = () => {
    const text = input.trim();

    if (text === "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setInput("");
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== id)
    );
  };


  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

 
  const totalTodos = todos.length;

  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;

  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="todo-app">
      

      <div className="todo-header">
        <div>
          <p className="todo-label">TASK MANAGER</p>

          <h1>Todo App</h1>

          <p className="todo-description">
            Kundalik vazifalaringizni tartib bilan boshqaring.
          </p>
        </div>
      </div>

      

      <div className="todo-stats">
        <div className="stat-card">
          <span>Jami</span>

          <strong>{totalTodos}</strong>
        </div>

        <div className="stat-card">
          <span>Bajarilgan</span>

          <strong>{completedTodos}</strong>
        </div>

        <div className="stat-card">
          <span>Kutilmoqda</span>

          <strong>{pendingTodos}</strong>
        </div>
      </div>

     

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Yangi vazifa yozing..."
        />

        <button onClick={addTodo}>
          Qo‘shish
        </button>
      </div>

      

      <div className="list-header">
        <h2>Vazifalar</h2>

        <span>
          {totalTodos} ta
        </span>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={
              todo.completed ? "completed" : ""
            }
          >
            <div className="todo-content">
              <button
                className="complete-button"
                onClick={() =>
                  toggleComplete(todo.id)
                }
                aria-label="Todo holatini o'zgartirish"
              >
                {todo.completed ? "✓" : ""}
              </button>

              <span
                onClick={() =>
                  toggleComplete(todo.id)
                }
              >
                {todo.text}
              </span>
            </div>

            <button
              className="delete-button"
              onClick={() =>
                deleteTodo(todo.id)
              }
            >
              O‘chirish
            </button>
          </li>
        ))}
      </ul>

     

      {todos.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">✓</div>

          <h3>Hozircha vazifalar yo‘q</h3>

          <p>
            Birinchi vazifangizni qo‘shing va
            ishni boshlang.
          </p>
        </div>
      )}
    </div>
  );
}

export default TodoApp;