const express = require("express");
const {
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

router.post("/tasks", addTask); // Add
router.put("/tasks/:id", updateTask); // Update
router.delete("/tasks/:id", deleteTask); // Delete

module.exports = router;
