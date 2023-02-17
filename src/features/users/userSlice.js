import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Fetch users
export const fetchallusers = createAsyncThunk(
  "users/my_users",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.fetchallusers(token);
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
export const edituserdetails = createAsyncThunk(
  "users/edit",
  async (user_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.edituserdetails(token, user_data);
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

// Create a user
export const createnewuser = createAsyncThunk(
  "users/create",
  async (user_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.createnewuser(token, user_data);
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
export const deleteuser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.deleteuser(token, id);
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

export const usersSlice = createSlice({
  name: "users", // this is the name of our slice
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchallusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchallusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(fetchallusers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createnewuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createnewuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.users = [...state.users, action.payload];
      })
      .addCase(createnewuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(edituserdetails.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(edituserdetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.map((user) =>
          user.user_id === action.payload.user_id
            ? (user = action.payload)
            : user
        );
      })
      .addCase(edituserdetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
