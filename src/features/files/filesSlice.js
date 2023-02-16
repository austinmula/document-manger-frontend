import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filesService from "./filesService";

const initialState = {
  files: [],
  temp_files: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Fetch files
export const fetchallfiles = createAsyncThunk(
  "files/my_files",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await filesService.fetchallfiles(token);
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

// Edit a file
export const editfiledetails = createAsyncThunk(
  "files/edit",
  async (file_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await filesService.editfiledetails(token, file_data);
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

// Delete A file
export const deletefile = createAsyncThunk(
  "files/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await filesService.deletefile(token, id);
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
  name: "files", // this is the name of our slice
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
        state.files = action.payload;
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
        state.files = state.files.map((file) =>
          file.file_id === action.payload.file_id
            ? (file = action.payload)
            : file
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
        state.files = state.files.filter(
          (file) => file.file_id !== action.payload.file_id
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