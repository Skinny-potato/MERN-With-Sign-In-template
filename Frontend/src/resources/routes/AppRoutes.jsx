import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "../../components/Home.jsx";
import AuthContainer from '../../components/AuthContainer';
import LoggedInHomePage from '../../components/LoggedInHomePage.jsx';
import PrivateRoute from '../../resources/Auth/private-route.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/auth/:authType" element={<AuthContainer />} />

      {/* Private Routes */}
      <Route
        path="/afterlogin"
        element={
          <PrivateRoute>
            <LoggedInHomePage />
          </PrivateRoute>
        }
      />


      {/* Catch-all Route for undefined paths */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
