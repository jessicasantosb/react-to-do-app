const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    unique: true,
    required: [true, "task is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'todoUserCollections'
  }
});

module.exports =
  mongoose.model.todocollections ||
  mongoose.model("todocollections", todoSchema);
