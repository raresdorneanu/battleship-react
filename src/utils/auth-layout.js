import { Outlet, Navigate } from "react-router-dom";

export const AuthLayout = () => {
  const tokenFromLS = localStorage.getItem("token");
  if (tokenFromLS?.length) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return <Outlet />;
};
