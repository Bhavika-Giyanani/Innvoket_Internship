import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};
export const updateTaskId = async (userId, { task_id }) => {
  const response = await axios.put(`${API_URL}/users/${userId}`, { task_id });
  console.log("API Successful:", response.data);
  return response.data;
};

export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData);
  return response.data;
};
