const BASE_URL =
  "http://localhost:8000/api" ||
  "https://to-do-app-backend-1t1n.onrender.com/api";

const LIST = `${BASE_URL}/todoList`;
const CREATE = `${BASE_URL}/createTodo`;
const COMPLETE = `${BASE_URL}/isCompleted`;
const DELETE = `${BASE_URL}/deleteTodo`;
const REFRESH = `${BASE_URL}/refresh`;

export { LIST, CREATE, COMPLETE, DELETE, REFRESH };
