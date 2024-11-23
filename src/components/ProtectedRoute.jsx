import React from 'react';
import { Navigate } from 'react-router-dom';
import keycloak from '../keycloak'; // Import your Keycloak instance

const ProtectedRoute = ({ children }) => {
  if (!keycloak.authenticated) {
    // Redirect to Keycloak login if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
