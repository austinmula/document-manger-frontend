import axios from "axios";

const fetchalldepartments = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/departments", config);

  return response.data.data;
};

const deletedepartment = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.delete("/departments/" + id, config);
  return { id };
};

const departmentService = {
  fetchalldepartments,
  deletedepartment,
};

export default departmentService;
