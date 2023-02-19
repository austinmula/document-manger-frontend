import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filesService from "./filesService";

const initialState = {
  files: [],
  categories: [],
  temp_files: [],
  file: {},
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

// Create a file
export const createnewfile = createAsyncThunk(
  "files/edit",
  async (file_data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await filesService.createnewfile(token, file_data);
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

export const fetchonefile = createAsyncThunk(
  "files/getone",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await filesService.fetchonefile(token, id);
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
        state.files = action.payload.data;
        state.temp_files = action.payload.temp;
      })
      .addCase(fetchallfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchonefile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchonefile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.file = action.payload.data;
        // state.temp_files = action.payload.temp;
      })
      .addCase(fetchonefile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createnewfile.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createnewfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.files = [...state.files, action.payload];
      })
      .addCase(createnewfile.rejected, (state, action) => {
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
