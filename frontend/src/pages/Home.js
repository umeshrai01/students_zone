import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import custom styles for Home

function Home() {
  return (
    <div className="homepage">
      <div className="overlay">
        <h1 className="homepage-title">Welcome to Students Zone</h1>
        <p className="homepage-subtitle">Find PG Rooms and Mess facilities across Ranchi, Dhanbad, Bokaro, Jamshedpur</p>
        <Link to="/localities" className="btn btn-primary custom-btn mt-3">Search Localities & Mess Services</Link>
      </div>
    </div>
  );
}

export default Home;