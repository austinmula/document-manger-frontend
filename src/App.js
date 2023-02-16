import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PlainLayout from "./layouts/PlainLayout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<PlainLayout />}>
          <Route element={<LoginPage />} path="login" />
        </Route>

        <Route element={<DashboardLayout />} path="dashboard">
          <Route element={<Dashboard />} index />
        </Route>
      </Routes>
      {/* <DashboardLayout /> */}
    </div>
  );
}

export default App;
