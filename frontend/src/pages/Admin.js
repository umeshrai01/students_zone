import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [localities, setLocalities] = useState([]);
  const [editingLocality, setEditingLocality] = useState(null); // Track the locality being edited
  const [localityFormData, setLocalityFormData] = useState({
    city: '',
    name: '',
    ownerName: '',
    contact: '',
    address: '',
    googleMapLink: '',
    type: ''
  }); // Locality form data
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchLocalities(token);
    }
  }, []);

  const fetchLocalities = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/locality', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLocalities(response.data);
    } catch (err) {
      console.error('Error fetching localities:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocalityChange = (e) => {
    setLocalityFormData({ ...localityFormData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/admin/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/auth/admin/signup', formData);
      alert('Signup successful!');
      setIsLogin(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred during signup.');
    }
  };

  const handleEdit = (locality) => {
    setEditingLocality(locality);
    setLocalityFormData({
      city: locality.city || '',
      name: locality.name,
      ownerName: locality.ownerName || '',
      contact: locality.contact || '',
      address: locality.address || '',
      googleMapLink: locality.googleMapLink || '',
      type: locality.type,
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5001/api/locality/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLocalities(token);
    } catch (error) {
      console.error('Error deleting locality:', error);
    }
  };

  const handleLocalitySubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (editingLocality) {
        await axios.put(`http://localhost:5001/api/locality/${editingLocality._id}`, localityFormData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setEditingLocality(null);
      setLocalityFormData({
        city: '',
        name: '',
        ownerName: '',
        contact: '',
        address: '',
        googleMapLink: '',
        type: ''
      });
      fetchLocalities(token);
    } catch (error) {
      console.error('Error saving locality:', error);
    }
  };

  return (
    <div className="container mt-5">
      {localStorage.getItem('token') ? (
        // Logged-in view
        <div>
          <h2 className="text-center mb-4">Admin Dashboard</h2>
          
          {/* Existing Localities with Edit/Delete options */}
          <div className="row">
            <div className="col-md-8">
              <h3>Existing Localities</h3>
              <ul className="list-group">
                {localities.map(locality => (
                  <li key={locality._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h4>{locality.name} ({locality.type})</h4>
                      <p>{locality.address}</p>
                      <p>{locality.city}</p>
                      <p>{locality.ownerName}</p>
                      <p>{locality.contact}</p>
                      <p><a href={locality.googleMapLink} target="_blank" rel="noopener noreferrer">Google Map</a></p>
                    </div>
                    <div>
                      <button onClick={() => handleEdit(locality)} className="btn btn-warning me-2">Edit</button>
                      <button onClick={() => handleDelete(locality._id)} className="btn btn-danger">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Edit Locality Form */}
            <div className="col-md-4">
              {editingLocality && (
                <div className="card p-3">
                  <h3>Edit Locality</h3>
                  <form onSubmit={handleLocalitySubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="City"
                        value={localityFormData.city}
                        onChange={handleLocalityChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        value={localityFormData.name}
                        onChange={handleLocalityChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="ownerName"
                        placeholder="Owner Name"
                        value={localityFormData.ownerName}
                        onChange={handleLocalityChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="contact"
                        placeholder="Contact"
                        value={localityFormData.contact}
                        onChange={handleLocalityChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        value={localityFormData.address}
                        onChange={handleLocalityChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="googleMapLink"
                        placeholder="Google Map Link"
                        value={localityFormData.googleMapLink}
                        onChange={handleLocalityChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="type"
                        placeholder="Type (e.g., Room, Mess)"
                        value={localityFormData.type}
                        onChange={handleLocalityChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Locality
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Add Locality Button */}
          <button className="btn btn-primary mt-4" onClick={() => navigate('/add-locality')}>
            Add New Locality
          </button>
        </div>
      ) : (
        // Login/Signup view
        <div>
          <h2 className="text-center mb-4">{isLogin ? 'Admin Login' : 'Admin Signup'}</h2>
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
              {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
              <p className="mt-3">Don't have an account? <a href="#!" onClick={() => setIsLogin(false)}>Sign up</a></p>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign up</button>
              {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
              <p className="mt-3">Already have an account? <a href="#!" onClick={() => setIsLogin(true)}>Login</a></p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;