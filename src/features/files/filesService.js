import axios from "axios";

const API_URL = "";

const fetchallfiles = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/files", config);
  return response.data;
};

const fetchonefile = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(config);
  const response = await axios.get("/files/" + id, config);
  console.log(response);
  return response.data;
};

const createnewfile = async (token, data) => {
  // axios.defaults.headers.post["Content-Type"] =
  //   "application/x-www-form-urlencoded";

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json;charset=utf-8",
      // "Access-Control-Allow-Origin": "*",
    },
  };

  const response = await axios.post("/files", data, config);
  console.log(response.data.data);
  return response.data.data;
};

const editfiledetails = async (token, file_data) => {
  const config = {
    headers: {
      token: token,
    },
  };

  const response = await axios.put(
    API_URL + file_data.file_id,
    file_data,
    config
  );
  console.log(response);
};

const deletefile = async (token, id) => {
  // console.log(token);
  const config = {
    headers: {
      token: token,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const filesService = {
  fetchallfiles,
  editfiledetails,
  deletefile,
  createnewfile,
  fetchonefile,
};

export default filesService;
