const todocollections = require("../db/todoModel");
const mongoose = require("mongoose");

const getTodo = async (req, res) => {
  try {
    const todos = await todocollections.find();
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
    const newTodo = new todocollections({
      task: task,
      category: category,
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
    const updateTodo = await todocollections.findByIdAndUpdate(todoID, update);
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
    const deleteTodo = await todocollections.findByIdAndDelete({ _id: id });
    res.status(200).send(deleteTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const completeTodo = async (req, res) => {
  const todo = await todocollections.findById(req.params.id);
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
