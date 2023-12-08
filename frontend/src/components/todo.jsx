import { React } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

export default function Todo({ todo, deleteTodo, completeTodo }) {
  return (
    <section>
      <p className="todo-category">{todo.category}</p>
      <div className={todo.isCompleted ? "todo todo-isCompleted" : "todo"}>
        <button
          className={todo.isCompleted ? "btn-check-isCompleted" : "btn-check"}
          onClick={() => completeTodo(todo._id)}
        >
          {" "}
          <FaCheck color={todo.isCompleted ? "gray" : "green"} size={25}/>
        </button>
        <div>
          <p className="todo-task">{todo.task}</p>
        </div>
        <button className="btn-trash" onClick={() => deleteTodo(todo._id)}>
          <FaTrash color="firebrick" size={25}/>
        </button>
      </div>
    </section>
  );
}
