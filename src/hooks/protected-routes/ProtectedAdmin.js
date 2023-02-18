import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  let location = useLocation();

  console.log();

  if (user?.token && user.user.role_id !== 4) {
    return <Navigate to="/dashboard/home" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedAdmin;

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const Protected = ({ children }) => {
//   const { user } = useSelector((state) => state.auth);
//   let location = useLocation();

//   if (!user?.token || !user?.user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// };

// export default Protected;
