import { React, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const Form = ({ addTodo }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [createBtnIsActive, setCreateBtnIsActive] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task || !category) {
      alert("Digite sua tarefa e escolha uma categoria, por favor!");
    }
    addTodo(task, category);
    setTask("");
    setCategory("");
    setMsg("Tarefa criada com sucesso!");
    setTimeout(() => {
      setMsg("")
    }, 2000);
  };
  const handleFormDisplay = () => {
    setCreateBtnIsActive(!createBtnIsActive);
  };

  return (
    <section>
      <p className="success-msg">{msg}</p>
        <FaPlusCircle
          onClick={handleFormDisplay}
          className="btn-displayForm"
          size={50}
        />
        <main className="form-section">
        <div className={createBtnIsActive ? "form-container" : "btn-form-hide"}>
          <form method="post" onSubmit={handleSubmit}>
            <div>
              <input
                className="form-input"
                value={task}
                type="text"
                placeholder="Digite algo"
                onChange={(e) => setTask(e.target.value)}
              />
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Selecione a categoria</option>
                <option value="trabalho">Trabalho</option>
                <option value="pessoal">Pessoal</option>
                <option value="estudos">Estudos</option>
              </select>
            </div>
            <button>Criar tarefa</button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Form;
