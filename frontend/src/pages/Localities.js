import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Localities() {
  const [city, setCity] = useState('Ranchi');
  const [messServices, setMessServices] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showMess, setShowMess] = useState(true); // To toggle between Mess and Rooms
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) { 
      const token = localStorage.getItem('token');
      const fetchServices = async () => {
        try {
          if (showMess) {
            const response = await axios.get(`http://localhost:5001/api/locality/mess/${city}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setMessServices(response.data);
          } else {
            const response = await axios.get(`http://localhost:5001/api/locality/rooms/${city}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setRooms(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchServices();
    } else {
      navigate('/login');
    }
  }, [city, showMess, navigate]);

  return (
    <div className="container">
      <h2>{showMess ? 'Mess Services' : 'PG Rooms'} in {city}</h2>
      <select value={city} onChange={(e) => setCity(e.target.value)} className="form-select mb-4">
        <option value="Ranchi">Ranchi</option>
        <option value="Dhanbad">Dhanbad</option>
        <option value="Bokaro">Bokaro</option>
        <option value="Jamshedpur">Jamshedpur</option>
      </select>
      <div className="btn-group mb-4">
        <button className="btn btn-primary" onClick={() => setShowMess(true)}>View Mess Services</button>
        <button className="btn btn-secondary" onClick={() => setShowMess(false)}>View PG Rooms</button>
      </div>
      <div className="list-group">
        {(showMess ? messServices : rooms).map(service => (
          <div className="list-group-item" key={service._id}>
            <h5>{service.name} - {service.city}</h5>
            <p>Owner: {service.owner}</p>
            <p>Contact: {service.contact}</p>
            <p>Address: {service.address}</p>
            <a href={service.mapLink} target="_blank" rel="noreferrer">View on Google Maps</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Localities;
