import axios from "axios";

const API_url = axios.create({ BASE_url: "http://localhost:8000/" });

const createTodo = async (task) => {
  const { data: newTodo } = await axios.post(API_url, {
    task,
  });
  return newTodo;
};
const deleteTodo = async (id) => {
  const message = await axios.delete(`${API_url}${id}`);
  return message;
};

const updateTodo = async (id, payload) => {
  const { data: newTodo } = await axios.put(`${API_url}${id}`, payload);
  return newTodo;
};

const getTodos = async () => {
  const { data: todos } = await axios.get(API_url);
  return todos;
};

export default { createTodo, deleteTodo, updateTodo, getTodos };