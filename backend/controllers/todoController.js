const { validationResult } = require("express-validator");
const Todo = require("../db/todoModel");
const User = require("../db/userModel");

const getTodo = async (req, res) => {
  try {
    const list = await User.findById(req.userId)
      .select("-password")
      .populate("todos")
      .exec();
    return res.status(200).send("All todos list", list);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(500).send("Todo id is required", error.mapped());
  }
  try {
    const result = await Todo.create({
      userId: req.userId,
      task: req.body.task,
      category: req.body.category,
    });
    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { todos: result },
        }
      );
      return res.status(200).send("Todo created successfuly", result);
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
};

const deleteTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(500).send("Todo id is required", error.mapped());
  }
  try {
    const result = await Todo.findOneAndDelete({
      userId: req.userId,
      _id: req.body.todo_id,
    });
    if (result) {
      const user = await User.findOneAndUpdate(
        {
          _id: req.userId,
        },
        { $pull: { todos: req.body.todo_id } }
      );
    }
    return res.status(200).send("Todo completed", null);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const completeTodo = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(500).send("Todo id is required", error.mapped());
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.body.todo_id,
        userId: req.userId,
      },
      [
        {
          $set: {
            isCompleted: {
              $eq: [false, "$isCompleted"],
            },
          },
        },
      ]
    );
    if (todo) {
      return res.status(200).send("Todo completed", todo);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getTodo,
  createTodo,
  deleteTodo,
  completeTodo,
};
