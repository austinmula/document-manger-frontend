import axios from "axios";

const API_URL = "";

const fetchallfiles = async (token) => {
  const response = await axios.get("/files");
  //   response.data.sort((a, b) => {
  //     return new Date(b.created_at) - new Date(a.created_at);
  //   });
  return response.data;
};

const edituserdetails = async (token, user_data) => {
  const config = {
    headers: {
      token: token,
    },
  };

  const response = await axios.put(
    API_URL + user_data.user_id,
    user_data,
    config
  );
  console.log(response);
};

const deleteuser = async (token, id) => {
  // console.log(token);
  const config = {
    headers: {
      token: token,
    },
  };

  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const usersService = {
  fetchallfiles,
  edituserdetails,
  deleteuser,
};

export default usersService;
