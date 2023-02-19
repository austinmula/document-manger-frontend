import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import filesReducer from "../features/files/filesSlice";
import roleReducer from "../features/roles/roleSlice";
import userReducer from "../features/users/userSlice";
import permissionReducer from "../features/permissions/permissionSlice";
import departmentReducer from "../features/departments/departmentSlice";
import fileCategoryReducer from "../features/filescategories/filesCategorySlice";
import requestsReducer from "../features/requests/requestsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    files: filesReducer,
    permissions: permissionReducer,
    roles: roleReducer,
    users: userReducer,
    departments: departmentReducer,
    categories: fileCategoryReducer,
    requests: requestsReducer,
  },
});
