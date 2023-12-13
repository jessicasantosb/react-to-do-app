import axios from "axios";
import { LIST, CREATE, COMPLETE, DELETE } from "./todoApiConstants";

const getListApi = async () => {
  let token = getToken();
  return axios.get(LIST, {
    headers: {
      'auth': token,
    },
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
};

const createTodoApi = async (task, category) => {
  let token = getToken();
  return axios.post(CREATE, { task, category }, {
    headers: {
      'auth': token,
    },
  })
  .then((response) => console.log(response.data))
  .catch((error) => {
    console.log(error)
  });
};

const deleteTodoApi = async (id) => {
  let token = getToken();
  console.log(token, "token");
  return axios.post(DELETE, id, {
    headers: {
      'auth': token,
    },
  });
};

const completeTodoApi = async (id) => {
  let token = getToken();
  console.log(token, "token");
  return axios.post(COMPLETE, id, {
    headers: {
      'auth': token,
    },
  });
};

const getToken = () => {
  let user = localStorage.getItem("auth");
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
};

export { getListApi, createTodoApi, deleteTodoApi, completeTodoApi };
