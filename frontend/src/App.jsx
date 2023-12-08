import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/App.css";
import Cookies from "universal-cookie";

import ThemeToggle from "./components/themeToggle";
import Todo from "./components/todo";
import Form from "./components/form";
import Search from "./components/search";
import Filter from "./components/filter";
import Login from "./components/modal/login";
import Register from "./components/modal/register";
import API from "./components/API";

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();

  const openLoginModal = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const logout = () => {
    cookies.remove("token", { path: "/" });
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await API.get();
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const createTodo = async (task, category) => {
    try {
      const response = await API.create(task, category);
      console.log(response);
      setTodos([...todos, response]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.erase(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await API.complete(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response : todo))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <section>
      {token ? (
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

      {token ? (
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

      {token ? (
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
      ) : (
        ""
      )}
    </section>
  );
}

export default App;
