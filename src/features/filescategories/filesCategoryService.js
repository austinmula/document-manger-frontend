import axios from "axios";

const fetchfilecategories = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/file-categories", config);
  console.log(response.data.data);
  return response.data.data;
};

const filesCategoryService = {
  fetchfilecategories,
};

export default filesCategoryService;
