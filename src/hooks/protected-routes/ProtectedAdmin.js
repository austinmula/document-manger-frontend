import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!isLoggedIn || user.role_id === 1) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedAdmin;
