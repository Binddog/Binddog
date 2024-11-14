import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ isLogin, children }) {
  return isLogin ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
