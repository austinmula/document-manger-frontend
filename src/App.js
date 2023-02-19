import { Route, Routes } from "react-router-dom";
import Protected from "./hooks/protected-routes/Protected";
import ProtectedAdmin from "./hooks/protected-routes/ProtectedAdmin";
import DashboardLayout from "./layouts/DashboardLayout";
import PlainLayout from "./layouts/PlainLayout";
import Dashboard from "./pages/Dashboard";
import Files from "./pages/Files";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Requests from "./pages/Requests";
import SingleFile from "./pages/SingleFile";
import Users from "./pages/Users";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PlainLayout />}>
          <Route element={<LoginPage />} path="login" />
        </Route>

        <Route
          element={
            <Protected>
              <DashboardLayout />
            </Protected>
          }
          path="dashboard"
        >
          <Route
            element={
              <ProtectedAdmin>
                <Dashboard />
              </ProtectedAdmin>
            }
            index
          />
          <Route element={<Home />} path="home" />
          <Route element={<Files />} path="files" />
          <Route element={<SingleFile />} path="files/:id" />
          <Route element={<Requests />} path="requests" />

          <Route
            element={
              <ProtectedAdmin>
                <Users />
              </ProtectedAdmin>
            }
            path="users"
          />
        </Route>
      </Routes>
      {/* <DashboardLayout /> */}
    </div>
  );
}

export default App;
