import { useState, useEffect } from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import {
  fetchUsers,
  fetchTasks,
  createTask,
  updateTaskId,
} from "../services/api";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));

    fetchTasks().then((data) => {
      const processedTasks = data.map((task) => ({
        ...task,
        user: task.userId?.name || "Unassigned",
      }));
      setTasks(processedTasks);
    });
  }, []);

  const handleAddTask = (taskData) => {
    createTask(taskData).then((newTask) => {
      const processedNewTask = {
        ...newTask,
        user:
          users.find((user) => user._id === newTask.userId)?.name ||
          "Unassigned",
      };
      setTasks((prevTasks) => [...prevTasks, processedNewTask]);

      updateTaskId(newTask.userId, { task_id: newTask._id }).catch((err) => {
        console.error("Failed to update user's task_id:", err);
      });
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className="parkinsans-font">Tasks</h1>
      <Form
        onSubmit={handleAddTask}
        fields={[
          { name: "title", label: "Task Title", type: "text" },
          {
            name: "userId",
            label: "Assign To",
            type: "dropdown",
            options: users.map((user) => ({
              value: user._id,
              label: user.name,
            })),
          },
        ]}
      />
      <Table columns={["title", "user"]} data={tasks} />
    </div>
  );
};

export default TasksPage;
