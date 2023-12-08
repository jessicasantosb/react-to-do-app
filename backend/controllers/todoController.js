const mongoose = require("mongoose");
const Todo = require("../db/todoModel");

const getTodo = async (req, res) => {
  try {
    const userId = req.user._id;
    const todos = await Todo.find({ owner: userId });
    res.status(200).send(todos);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const createTodo = async (req, res) => {
  try {
    const { task, category } = req.body;
    if (!task || !category) {
      return res.status(400).send("Both task and category are required.");
    }
    const newTodo = new Todo({
      task: task,
      category: category,
      owner: req.user._id,
    });
    await newTodo.save();
    res.status(201).send(newTodo);
    console.log("To do added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("There's a todo with the same id");
    }
    const todoID = { _id: id };
    const update = { isCompleted: true };
    const updateTodo = await Todo.findByIdAndUpdate(todoID, update);
    if (!updateTodo) {
      return res.status(404).send("There's a todo with the same id");
    }
    res.status(200).send(updateTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("There's a todo with the same id");
    }
    const deleteTodo = await Todo.findByIdAndDelete({ _id: id });
    res.status(200).send(deleteTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const completeTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.isCompleted = !todo.isCompleted;
  await todo.save();
  res.json(todo);
};

module.exports = {
  getTodo,
  createTodo,
  deleteTodo,
  completeTodo,
};
