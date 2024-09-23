import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Logging Out...</h2>
    </div>
  );
}

export default Logout;
