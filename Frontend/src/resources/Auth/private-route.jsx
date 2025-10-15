// src/components/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth-context';

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();  // Access auth state from context

  if (!authState?.isUserSignedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
