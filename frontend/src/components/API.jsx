import axios from "axios";

const API_url = "http://localhost:8000" || "https://to-do-app-backend-1t1n.onrender.com";

const get = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    const response = await axios.get(`${API_url}/todos`, {
      headers: {
        Authorization: `Bearer ${userData}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error.response);
    throw error;
  }
};

const create = async (task, category) => {
  try {
    const response = await axios.post(
      `${API_url}/todo/add`,
      { task, category, owner},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      }
    );
    if (response.status !== 201) {
      throw new Error("Failed to create a new todo item.");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const erase = async (id) => {
  try {
    const response = await axios.delete(`${API_url}/todo/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// const update = async (id, payload) => {
//   try {
// const response = await axios.post(`${API_url}/todo/update/${id}`, payload, {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("user")}`,
//   },
// });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating task:", error);
//     throw error;
//   }
// };

const complete = async (id) => {
  try {
    const response = await axios.put(`${API_url}/todo/complete/${id}`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export default { get, create, erase, complete };
