import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { LIST, CREATE, COMPLETE, DELETE, REFRESH } from "./todoApiConstants";

const getListApi = async () => {
  let token = await getToken();
  return axios
    .get(LIST, {
      headers: {
        auth: token,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const createTodoApi = async (task, category) => {
  let token = await getToken();
  return axios
    .post(
      CREATE,
      { task, category },
      {
        headers: {
          auth: token,
        },
      }
    )
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.log(error);
    });
};

const deleteTodoApi = async (id) => {
  let token = await getToken();
  console.log(token, "token");
  return axios.post(DELETE, id, {
    headers: {
      auth: token,
    },
  });
};

const completeTodoApi = async (id) => {
  let token = await getToken();
  console.log(token, "token");
  return axios.post(COMPLETE, id, {
    headers: {
      auth: token,
    },
  });
};

const getToken = async () => {
  let user = localStorage.getItem("auth");
  if (!user) return;
  const userObj = JSON.parse(user);
  const tokenPayload = jwtDecode(userObj.token);
  //check if token already expired
  if (tokenPayload.exp < (new Date().getTime() + 1) / 1000) {
    const result = await axios.post(REFRESH, {}, { withCredentials: true });
    localStorage.setItem("auth", JSON.stringify(result.data));
    return result.data.token;
  }
  return userObj.token;
};

export { getListApi, createTodoApi, deleteTodoApi, completeTodoApi };
