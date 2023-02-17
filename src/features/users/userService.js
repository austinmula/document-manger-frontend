import axios from "axios";

const API_URL = "";

const fetchallusers = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/users", config);

  return response.data.data;
};

const createnewuser = async (token, user_data) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post("/users", user_data, config);
  console.log(response.data.data);
  return response.data.data;
};

const deleteuser = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.delete("/users/" + id, config);
  return { id };
};

const userService = {
  fetchallusers,
  createnewuser,
  deleteuser,
};

export default userService;
