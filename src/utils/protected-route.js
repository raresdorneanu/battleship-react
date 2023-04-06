import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const tokenFromLS = localStorage.getItem("token");

  if (!tokenFromLS?.length) {
    return <Navigate to={"/signin"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
