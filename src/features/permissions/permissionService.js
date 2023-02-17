import axios from "axios";

const API_URL = "";

const fetchallpermissions = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/permissions", config);

  return response.data.data;
};

const deletepermission = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.delete("/permissions/" + id, config);
  return { id };
};

const permissionService = {
  fetchallpermissions,
  deletepermission,
};

export default permissionService;
