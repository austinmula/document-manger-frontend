import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filesCategoryService from "./filesCategoryService";

const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const fetchfilecategories = createAsyncThunk(
  "categories/all",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await filesCategoryService.fetchfilecategories(token);
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

export const fileCategorySlice = createSlice({
  name: "categories", // this is the name of our slice
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchfilecategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchfilecategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(fetchfilecategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = fileCategorySlice.actions;
export default fileCategorySlice.reducer;
