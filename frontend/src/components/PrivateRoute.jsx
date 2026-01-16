import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({user, setUser,children }) {

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  },[]);

  if (!user) {
    return <Navigate to="/auth" />;
  }
  return (children)
}
