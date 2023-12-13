const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.model.Todo ||
  mongoose.model("Todo", todoSchema);
