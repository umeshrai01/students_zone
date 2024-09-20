import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await axios.get('https://students-zone.onrender.com/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login'); // Redirect to login if unauthorized
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Welcome, {userData.username}</h2>
      <p>Email: {userData.email}</p>
      <div className="dashboard-nav">
        <button onClick={() => navigate('/profile')} className="btn btn-primary">Profile</button>
        <button onClick={() => navigate('/settings')} className="btn btn-secondary">Settings</button>
        {/* Add more buttons/links as needed */}
      </div>
    </div>
  );
};

export default Dashboard;