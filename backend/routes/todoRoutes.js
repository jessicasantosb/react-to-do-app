const { Router } = require("express");
const {
  getTodo,
  createTodo,
  deleteTodo,
  completeTodo,
} = require("../controllers/todoController");

const todo = Router();

todo.get("/todos", getTodo);
todo.post("/todo/add", createTodo);
todo.delete("/todo/delete/:id", deleteTodo);
todo.put("/todo/complete/:id", completeTodo);

module.exports = todo;
