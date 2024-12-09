const User = require("../models/userModel");
const Task = require("../models/taskModel");

//^ Add a new user
exports.addUser = async (req, res) => {
  try {
    const { task_id, ...userData } = req.body;

    const user = await User.create({
      ...userData,
      task_id: task_id || [],
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//^ Fetch all users with their tasks
exports.getUsersWithTasks = async (req, res) => {
  try {
    //^ New Learning : Populate
    const users = await User.find().populate("task_id");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//^ Update a user
exports.updateUser = async (req, res) => {
  try {
    const { task_id, ...updateData } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...updateData,
        task_id: task_id || [],
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//^ Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
