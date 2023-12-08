import { useRef, useState, useEffect } from "react";
import "./modal.css";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function Login({ showLogin, onCloseLogin, onRegisterOpen }) {
  if (!showLogin) {
    return null;
  }

  const cookies = new Cookies();
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const loginUrl = "http://localhost:8000/login" || "https://to-do-app-backend-1t1n.onrender.com/login";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "post",
      url: loginUrl,
      data: {
        username,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        setIsLoggedin(true);
        cookies.set("token", result.data.token, {
          path: "/",
        });
        localStorage.setItem("user", JSON.stringify(result.data.user));
        console.log(result.data);
        console.log(localStorage);
        navigate("/", { replace: true });
      })
      .catch((err) => {
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
