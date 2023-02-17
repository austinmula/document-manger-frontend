import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentService from "./departmentService";

const initialState = {
  departments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Fetch departments
export const fetchalldepartments = createAsyncThunk(
  "departments/my_roles",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await departmentService.fetchalldepartments(token);
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

export const departmentSlice = createSlice({
  name: "departments", // this is the name of our slice
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchalldepartments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchalldepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departments = action.payload;
      })
      .addCase(fetchalldepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = departmentSlice.actions;
export default departmentSlice.reducer;
