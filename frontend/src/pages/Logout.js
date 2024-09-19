import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token from local storage
    localStorage.removeItem('token');

    // Redirect to home page or login
    navigate('/');
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
