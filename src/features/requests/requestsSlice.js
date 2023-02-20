import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestsService from "./requestsService";

const initialState = {
  requests: [],
  request_me: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Fetch requests
export const fetchallrequests = createAsyncThunk(
  "requests/my_requests",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestsService.fetchallrequests(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a request
export const createnewrequest = createAsyncThunk(
  "requests/create",
  async (request_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestsService.createnewrequest(token, request_data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Edit a request(approve)
export const editrequestdetails = createAsyncThunk(
  "requests/edit",
  async (request_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestsService.editrequestdetails(token, request_data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete A request
export const deleterequest = createAsyncThunk(
  "requests/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestsService.deleterequest(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchrequeststome = createAsyncThunk(
  "requests/tome",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await requestsService.fetchrequeststome(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // console.log(message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const requestsSlice = createSlice({
  name: "requests", // this is the name of our slice
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchrequeststome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchrequeststome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.request_me = action.payload.data;
        // state.temp_requests = action.payload.temp;
      })
      .addCase(fetchrequeststome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchallrequests.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchallrequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = [...action.payload.data];
        // state.temp_requests = action.payload.temp;
      })
      .addCase(fetchallrequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createnewrequest.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createnewrequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = [...state.requests, action.payload];
      })
      .addCase(createnewrequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editrequestdetails.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(editrequestdetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = [...state.requests, action.payload];
      })
      .addCase(editrequestdetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleterequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleterequest.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.requests = state.requests.filter(
          (request) => request.request_id !== action.payload.request_id
        );
      })
      .addCase(deleterequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = requestsSlice.actions;
export default requestsSlice.reducer;
