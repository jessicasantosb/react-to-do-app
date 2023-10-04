const { Router } = require("express");
const {
  getTodo,
  createTodo,
  deleteTodo,
  completeTodo,
} = require("../controllers/todoController");

const router = Router();

router.get("/todos", getTodo);
router.post("/todo/add", createTodo);
router.delete("/todo/delete/:id", deleteTodo);
router.put("/todo/complete/:id", completeTodo);

module.exports = router;
