import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!user?.token || !user?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default Protected;
