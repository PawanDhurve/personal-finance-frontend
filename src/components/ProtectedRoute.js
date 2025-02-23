import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // ✅ Check login (Replace with your auth logic)
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
