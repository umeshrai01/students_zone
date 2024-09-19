import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Students Zone</h1>
      <p>Find PG Rooms and Mess facilities across Ranchi, Dhanbad, Bokaro, Jamshedpur</p>
      <Link to="/localities" className="btn btn-primary mt-3">Search Localities & Mess Services</Link>
    </div>
  );
}

export default Home;