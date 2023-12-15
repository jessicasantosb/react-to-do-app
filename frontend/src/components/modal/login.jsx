import { useRef, useState, useEffect } from "react";
import "./modal.css";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import useAuth from "../hooks/useAuth";

function Login({ showLogin, onCloseLogin, onRegisterOpen }) {
  const { setAuth } = useAuth();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const apiUrl =
    "http://localhost:8000/api" ||
    "https://to-do-app-backend-1t1n.onrender.com/api";

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const configuration = {
      method: "post",
      url: `${apiUrl}/login`,
      data: {
        username,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        setIsLoggedin(true);
        const accessToken = localStorage.setItem(
          "auth",
          JSON.stringify(result.data)
        );
        setAuth({ username, password, accessToken });
        window.location.reload(true);
      })
      .catch((err) => {
        console.log({ err });
        if (!err?.response) {
          setErrMsg("No server response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing username or password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login failed");
        }
        errRef.current.focus();
      });
  };

  if (!showLogin) {
    return null;
  }

  return (
    <section className="modal-section">
      <div>
        <button className="onClose" onClick={onCloseLogin}>
          <FaTimes className="onCloseIcon" size={25} />
        </button>
        <main className="modal-container">
          <p
            ref={errRef}
            className={`errMsg${errMsg ? "" : "hiddenErrMsg"}`}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Bem-vindo</h1>

          <form
            className="login-form"
            action="POST"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className="login-form-label" htmlFor="username">
              Nome de usuário:
            </label>
            <input
              className="login-form-input"
              type="text"
              name="username"
              ref={userRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label className="login-form-label" htmlFor="password">
              Senha:
            </label>
            <input
              className="login-form-input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button onClick={(e) => handleSubmit(e)}>Login</button>

            <p className="question">
              Ainda não tem uma conta?
              <br />
              <span className="question-span" onClick={onRegisterOpen}>
                Registrar
              </span>
            </p>
          </form>
        </main>
      </div>
    </section>
  );
}

export default Login;
