import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://students-zone.onrender.com/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <p>Username: {profileData.username}</p>
      <p>Email: {profileData.email}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default Profile;