import React from "react";
import { useAuth } from "../../features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { UserRole } from "../../utils/function";

function ProtectRoute({ children }) {
  const { accessToken, user } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}

export function AdminRoute({ children }) {
  const { accessToken, user } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  if (user && user.role.includes(UserRole.admin)) {
    return children;
  }

  return <Navigate to={"/"} replace />;
}

export default ProtectRoute;
