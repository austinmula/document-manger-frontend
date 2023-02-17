import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import roleService from "./roleService";

const initialState = {
  roles: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Fetch roles
export const fetchallroles = createAsyncThunk(
  "roles/my_roles",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roleService.fetchallroles(token);
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

// Edit a role
export const editroledetails = createAsyncThunk(
  "roles/edit",
  async (role_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roleService.editroledetails(token, role_data);
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

// Delete A role
export const deleterole = createAsyncThunk(
  "roles/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await roleService.deleterole(token, id);
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

export const rolesSlice = createSlice({
  name: "roles", // this is the name of our slice
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchallroles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchallroles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roles = action.payload;
      })
      .addCase(fetchallroles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(editroledetails.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(editroledetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roles = state.roles.map((role) =>
          role.role_id === action.payload.role_id
            ? (role = action.payload)
            : role
        );
      })
      .addCase(editroledetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleterole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleterole.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.roles = state.roles.filter(
          (role) => role.id !== action.payload.id
        );
      })
      .addCase(deleterole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = rolesSlice.actions;
export default rolesSlice.reducer;
