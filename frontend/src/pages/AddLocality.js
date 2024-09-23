import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddLocality() {
  const [locality, setLocality] = useState({
    city: '', name: '', owner: '', contact: '', address: '', mapLink: '', type: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddLocality = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!locality.city || !locality.name || !locality.owner || !locality.contact || !locality.address || !locality.type) {
      setError('Please fill out all required fields');
      return;
    }

    try {
      const url = 'http://localhost:5001/api/locality';
      const response = await axios.post(url, locality, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(response.data.message);
      navigate('/admin');
    } catch (err) {
      setError('Error adding locality. Please try again.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Locality</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleAddLocality}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={locality.city}
            onChange={(e) => setLocality({ ...locality, city: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Locality Name"
            value={locality.name}
            onChange={(e) => setLocality({ ...locality, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Owner Name"
            value={locality.owner}
            onChange={(e) => setLocality({ ...locality, owner: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Contact"
            value={locality.contact}
            onChange={(e) => setLocality({ ...locality, contact: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={locality.address}
            onChange={(e) => setLocality({ ...locality, address: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Google Map Link"
            value={locality.mapLink}
            onChange={(e) => setLocality({ ...locality, mapLink: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            value={locality.type}
            onChange={(e) => setLocality({ ...locality, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="room">Room</option>
            <option value="mess">Mess</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Locality</button>
      </form>
    </div>
  );
}

export default AddLocality;
