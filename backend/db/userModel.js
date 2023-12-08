const mongoose = require("mongoose");

const todoUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
});

todoUserSchema.virtual("todocollections", {
  ref: "todocollections",
  localField: "_id",
  foreignField: "owner",
});

module.exports =
  mongoose.model.todoUserCollections ||
  mongoose.model("todoUserCollections", todoUserSchema);
