import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  const isTokenValid = () => {
    if (!token) return false; // Return false if no token

    try {
      // Decode token and verify expiration and role
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token:', decodedToken); // Debugging info

      const { exp, role } = decodedToken;
      const isTokenNotExpired = exp * 1000 > Date.now();
      const hasRequiredRole = !requiredRole || role === requiredRole;

      return isTokenNotExpired && hasRequiredRole;
    } catch (error) {
      console.error('Error decoding token:', error); // Log decoding errors
      return false;
    }
  };

  return isTokenValid() ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;