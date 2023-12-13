const express = require("express");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { login, register } = require("../controllers/userController.js");
const {
  createTodo,
  getTodos,
  isCompleted,
  deleteTodo,
} = require("../controllers/todoController.js");
const VerifyRefreshToken = require("../middleware/refreshToken.js")

const apiRoute = express.Router();
const apiProtected = express.Router();

apiRoute.post("/login", login);
apiRoute.post("/register", register);

// protected routes
apiProtected.post("/refreshToken", VerifyRefreshToken, (req, res) => {
  const { refreshToken } = req.body;
    const token = jwt.sign({ refreshToken }, process.env.JWT_SECRET, { expiresIn: '200s' });
    return res.json({ token });
});
apiProtected.get("/todoList", (req, res) => {
  getTodos;
});
apiProtected.post("/createTodo", (req, res) => {
  [check("task", "Todo task is required").exists(), check("category", "Todo category is required").exists()], createTodo;
});
apiProtected.post("/isCompleted", (req, res) => {
  [check("todo_id", "Todo id is required").exists()], isCompleted;
});
apiProtected.post("/deleteTodo", (req, res) => {
  [check("todo_id", "Todo id is required").exists()], deleteTodo;
});

module.exports = { apiRoute, apiProtected };
