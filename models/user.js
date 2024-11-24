const mongoose = require("mongoose");

// Task Schema
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [taskSchema],
});

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
