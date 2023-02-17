import axios from "axios";

const API_URL = "";

const fetchallusers = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/users", config);
  //   response.data.sort((a, b) => {
  //     return new Date(b.created_at) - new Date(a.created_at);
  //   });
  return response.data;
};

const userService = {
  fetchallusers,
};

export default userService;
