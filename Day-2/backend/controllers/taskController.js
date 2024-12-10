const Task = require("../models/taskModel");
const User = require("../models/userModel");

//^ Get tasks
exports.getTask = async (req, res) => {
  try {
    const task = await Task.find({});
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//^ Add a task
exports.addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//^ Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//^ Delete a task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//^ Find User Assigned Task
exports.findAssigned = async (req, res) => {
  try {
    const users = await Task.find().populate("userId");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
