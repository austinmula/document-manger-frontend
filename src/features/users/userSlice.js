import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  temp_files: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Fetch users
export const fetchallfiles = createAsyncThunk(
  "users/my_files",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.fetchallfiles(token);
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

// Edit a user
export const editfiledetails = createAsyncThunk(
  "users/edit",
  async (file_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.editfiledetails(token, file_data);
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

// Delete A user
export const deletefile = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.deletefile(token, id);
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

export const filesSlice = createSlice({
  name: "users", // this is the name of our slice
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchallfiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchallfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(fetchallfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(editfiledetails.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(editfiledetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.map((user) =>
          user.user_id === action.payload.user_id
            ? (user = action.payload)
            : user
        );
      })
      .addCase(editfiledetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletefile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletefile.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (user) => user.user_id !== action.payload.user_id
        );
      })
      .addCase(deletefile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = filesSlice.actions;
export default filesSlice.reducer;
