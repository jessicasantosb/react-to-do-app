import { useRef, useState, useEffect } from "react";
import "./modal.css";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import axios from "axios";

function Register({ showRegister, onLoginOpen, onCloseRegister, onSuccessfulRegistration }) {
  if (!showRegister) {
    return null;
  }
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const registerUrl = "http://localhost:8000/api/register" || "https://to-do-app-backend-1t1n.onrender.com/api/register";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [register, setRegister] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(usernameRegex.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(passwordRegex.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation1 = usernameRegex.test(username);
    const validation2 = passwordRegex.test(password);

    if (!validation1 || !validation2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const configuration = {
        method: "post",
        url: registerUrl,
        data: {
          username,
          password,
        },
      };
      axios(configuration).then((result) => {
        setRegister(true);
        if (result.data.status === 200) {
          localStorage.setItem('auth', JSON.stringify(result.data.data))
        }
        onSuccessfulRegistration();
      });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="modal-section">
      <div>
        <button className="onClose" onClick={onCloseRegister}>
          <FaTimes className="onCloseIcon" size={25} />
        </button>
        <main className="modal-container">
          <p
            ref={errRef}
            className={`errMsg${errMsg ? "" : "hiddenErrMsg"}`}
            aria-live="assertive"
          >
            {errMsg}
            {register ? <p>Registro realizado com sucesso</p> : ""}
          </p>
          <h1>Cadastro</h1>
          <form
            className="register-form"
            action="POST"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className="register-form-label" htmlFor="username">
              Nome de usuário:
              <span className={validName ? "" : "registerHideChecker"}>
                <FaCheck className="registerChecker" id="registerIcon" />
              </span>
              <span
                className={validName || !username ? "registerHideChecker" : ""}
              >
                <FaTimes className="registerChecker" />
              </span>
            </label>
            <input
              className="register-form-input"
              type="text"
              name="username"
              value={username}
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="usernameNote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              className={`registerInstructions ${
                userFocus && username && !validName
                  ? ""
                  : "hideRegisterInstructions"
              }`}
            >
              <FaInfoCircle id="registerIcon" />
              <br />- De 4 a 24 caracteres.
              <br />- Deve começar com uma letra.
              <br />- Letras, números, underline e hífens permitidos.
            </p>

            <label className="register-form-label" htmlFor="password">
              Senha:
              <span className={validPassword ? "" : "registerHideChecker"}>
                <FaCheck className="registerChecker" id="registerIcon" />
              </span>
              <span
                className={
                  validPassword || !password ? "registerHideChecker" : ""
                }
              >
                <FaTimes className="registerChecker" />
              </span>
            </label>
            <input
              className="register-form-input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="passwordNote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              className={`registerInstructions ${
                passwordFocus && !validPassword
                  ? ""
                  : "hideRegisterInstructions"
              }`}
            >
              <FaInfoCircle id="registerIcon" />
              <br />- De 8 a 24 caracteres.
              <br />- Deve incluir letras maiúsculas e minúsculas, um número e
              um caractere especial.
              <br />- Caracteres especiais permitidos:{" "}
              <span arial-label="exclamation mark">!</span>{" "}
              <span arial-label="at symbol">@</span>{" "}
              <span arial-label="hashtag">#</span>{" "}
              <span arial-label="dolar sign">$</span>{" "}
              <span arial-label="percent">%</span>
            </p>

            <label className="register-form-label" htmlFor="confirmPassword">
              Confirmar senha:
              <span
                className={
                  validMatch && matchPassword ? "" : "registerHideChecker"
                }
              >
                <FaCheck className="registerChecker" id="registerIcon" />
              </span>
              <span
                className={
                  validMatch || !matchPassword ? "registerHideChecker" : ""
                }
              >
                <FaTimes className="registerChecker" />
              </span>
            </label>
            <input
              className="register-form-input"
              type="password"
              onChange={(e) => setMatchPassword(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmNote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              className={`registerInstructions ${
                matchFocus && !validMatch ? "" : "hideRegisterInstructions"
              }`}
            >
              <FaInfoCircle id="registerIcon" />
              <br />- Deve coincidir com o primeiro campo de entrada de senha.
            </p>

            <button
              onClick={(e) => handleSubmit(e)}
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              Cadastrar
            </button>

            <p className="question">
              Já registrado?
              <br />
              <span className="question-span" onClick={onLoginOpen}>Login</span>
            </p>            
          </form>
        </main>
      </div>
    </section>
  );
}

export default Register;
