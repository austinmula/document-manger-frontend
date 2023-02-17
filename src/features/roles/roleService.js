import axios from "axios";

const fetchallroles = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/roles", config);

  return response.data.data;
};

const deleterole = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.delete("/roles/" + id, config);
  return { id };
};

const roleService = {
  fetchallroles,
  deleterole,
};

export default roleService;
