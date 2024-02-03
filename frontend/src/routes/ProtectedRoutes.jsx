/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children, allowesRoles }) => {
  const { token, role } = useContext(authContext);
  const isAllowed = allowesRoles.includes(role);

  const accessibleRoute =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;

  return accessibleRoute;
};

export default ProtectedRoutes;
