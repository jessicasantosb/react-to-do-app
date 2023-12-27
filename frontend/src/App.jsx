import { React, useState, useEffect } from "react";
import "./styles/App.css";

import ThemeToggle from "./components/toggleBtn/themeToggle";
import Todo from "./components/todo";
import Form from "./components/form";
import Search from "./components/search";
import Filter from "./components/filter";
import Login from "./components/modal/login";
import Register from "./components/modal/register";
import {
  getListApi,
  createTodoApi,
  deleteTodoApi,
  completeTodoApi,
} from "./components/services/todoApi";

function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLoginModal = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload(true);
  };

  useEffect(() => {
    const u = localStorage.getItem("auth");
    setUser(u);
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getListApi();
        if (todosData && todosData.data && Array.isArray(todosData.data)) {
          setTodos(todosData.data);
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
        setTodos([]);
      }
    };
    fetchTodos();
  }, []);

  const createTodo = async (task, category) => {
    try {
      const response = await createTodoApi(task, category);
      setTodos([...todos, response]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoApi(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await completeTodoApi(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response : todo))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <section>
      {user ? (
        <button
          className="logout-btn"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      ) : (
        <div>
          <div className="login-register-div">
            <button
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setShowRegister(true);
              }}
            >
              Registrar
            </button>
          </div>
          <Login
            showLogin={showLogin}
            onCloseLogin={() => setShowLogin(false)}
            onRegisterOpen={() => setShowRegister(true)}
          />
          <Register
            showRegister={showRegister}
            onCloseRegister={() => setShowRegister(false)}
            onLoginOpen={() => setShowLogin(true)}
            onSuccessfulRegistration={openLoginModal}
          />
        </div>
      )}

      <ThemeToggle />

      <h1 className="title">Lista de tarefas</h1>

      {user ? (
        <Form addTodo={createTodo} />
      ) : (
        <div className="pleaseLogin">
          <p>Para adicionar uma tarefa, por favor, faça o login.</p>
        </div>
      )}

      <div className="search-filter">
        <Filter
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setSort={setSort}
        />
        <Search search={search} setSearch={setSearch} />
      </div>

      {user ? (
        <div className="todo-list">
          <div>
            {todos
              .filter((todo) =>
                filterStatus === "All"
                  ? true
                  : filterStatus === "Completed"
                  ? todo.isCompleted
                  : !todo.isCompleted &&
                    todo.task &&
                    todo.task.toLowerCase().includes(search.toLowerCase())
              )
              .sort((a, b) => {
                if (a.task && b.task) {
                  return sort === "Asc"
                    ? a.task.localeCompare(b.task)
                    : b.task.localeCompare(a.task);
                }
                return 0;
              })
              .map((todo, index) => (
                <Todo
                  key={todo?._id || index}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default App;
