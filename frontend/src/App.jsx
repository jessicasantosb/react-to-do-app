import { React, useState, useEffect } from "react";
import "./styles/App.css";
import ThemeToggle from "./components/themeToggle.jsx";
import Todo from "./components/todo";
import Form from "./components/form";
import Search from "./components/search";
import Filter from "./components/filter";

const base_API = "http://localhost:8000";

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sort, setSort] = useState("Asc");

  useEffect(() => {
    fetchSetTodos();
  }, []);

  const fetchSetTodos = () => {
    fetch(`${base_API}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  };

  const createTodo = async (task, category) => {
    try {
      const data = await fetch(`${base_API}/todo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, category }),
      });
      if (!data.ok) {
        throw new Error("Failed to create a new to do item.");
      }
      const response = await response.json();
      setTodos([...todos, response]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTodo = async (id) => {
    const data = await fetch(`${base_API}/todo/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error deleting task:", err));
    setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
  };

  const completeTodo = async (id) => {
    const data = await fetch(`${base_API}/todo/complete/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .catch((err) => console.error("Error making task completed:", err));
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.isCompleted = data.isCompleted;
        }
        return todo;
      })
    );
  };

  return (
    <section>
      <ThemeToggle />
      <h1 className="title">Lista de tarefas</h1>
      <Form addTodo={createTodo} />
      <div className="search-filter">
        <Filter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setSort={setSort}
        />
        <Search search={search} setSearch={setSearch} />
      </div>
      <div className="todo-list">
        <div>
          {todos
            .filter((todo) =>
              filterStatus === "All"
                ? true
                : filterStatus === "Completed"
                ? todo.isCompleted
                : !todo.isCompleted
            )
            .filter((todo) =>
              todo.task.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) =>
              sort === "Asc"
                ? a.task.localeCompare(b.task)
                : b.task.localeCompare(a.task)
            )
            .map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default App;
