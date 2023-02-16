// Login user
import axios from "axios";

// login
const login = async (data) => {
  const response = await axios.post("/login", data);

  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
