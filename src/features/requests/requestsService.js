import axios from "axios";

const API_URL = "";

const fetchallrequests = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/requests", config);
  return response.data;
};

const fetchrequeststome = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get("/temp-requests-files", config);
  return response.data;
};

const fetchonerequest = async (token, id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(config);
  const response = await axios.get("/requests/" + id, config);
  console.log(response);
  return response.data;
};

const createnewrequest = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post("/requests", data, config);
  return response.data.data;
};

const editrequestdetails = async (token, request_data) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post(
    "/temp-requests-files",
    request_data,
    config
  );

  return response.data.data;
};

const deleterequest = async (token, id) => {
  // console.log(token);
  const config = {
    headers: {
      token: token,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const requestsService = {
  fetchallrequests,
  editrequestdetails,
  deleterequest,
  createnewrequest,
  fetchonerequest,
  fetchrequeststome,
};

export default requestsService;
