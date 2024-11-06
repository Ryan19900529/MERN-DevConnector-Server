import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (isAuthenticated && !loading) return <Component />;
  return <Navigate to='/login' />;
};

export default PrivateRoute;
