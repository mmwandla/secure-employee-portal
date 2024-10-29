import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
  
    if (!isAuthenticated) {
      return <Navigate to="/unauthorized" />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;
  
