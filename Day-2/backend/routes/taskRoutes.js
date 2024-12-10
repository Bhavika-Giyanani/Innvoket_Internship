const express = require("express");
const {
  getTask,
  addTask,
  updateTask,
  deleteTask,
  findAssigned,
} = require("../controllers/taskController");
const router = express.Router();

router.get("/tasks", findAssigned);
router.post("/tasks", addTask); // Add
router.put("/tasks/:id", updateTask); // Update
router.delete("/tasks/:id", deleteTask); // Delete

module.exports = router;
