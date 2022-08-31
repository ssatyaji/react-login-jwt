import React from "react";
import { Navigate } from "react-router-dom";
import { withAuth } from "../context/AuthContext";

function ProtectedRoute(props) {
  const { component: Component, ...rest } = props;

  if (!props.isLoggedIn){
    return <Navigate push to="/" />;    
  }

  return props.children;
}

export default withAuth(ProtectedRoute);
