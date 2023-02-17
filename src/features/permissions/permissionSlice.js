import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import permissionService from "./permissionService";

const initialState = {
  permissions: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Fetch permissions
export const fetchallpermissions = createAsyncThunk(
  "permissions/my_permissions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await permissionService.fetchallpermissions(token);
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

// Edit a permission
export const editpermissiondetails = createAsyncThunk(
  "permissions/edit",
  async (permission_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await permissionService.editpermissiondetails(
        token,
        permission_data
      );
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

// Delete A permission
export const deletepermission = createAsyncThunk(
  "permissions/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await permissionService.deletepermission(token, id);
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

export const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchallpermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchallpermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.permissions = action.payload;
      })
      .addCase(fetchallpermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(editpermissiondetails.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(editpermissiondetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.permissions = state.permissions.map((permission) =>
          permission.permission_id === action.payload.permission_id
            ? (permission = action.payload)
            : permission
        );
      })
      .addCase(editpermissiondetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletepermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletepermission.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.permissions = state.permissions.filter(
          (permission) => permission.id !== action.payload.id
        );
      })
      .addCase(deletepermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = permissionsSlice.actions;
export default permissionsSlice.reducer;
