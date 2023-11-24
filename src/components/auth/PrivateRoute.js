import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAuthenticated, redirectTo = "/login" }) => {
  console.log("isAuthenticated++++++",isAuthenticated)
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={redirectTo} replace={true} state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
