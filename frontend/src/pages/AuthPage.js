import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'https://students-zone.onrender.com/api/auth/login' : 'https://students-zone.onrender.com/api/auth/signup';

    try {
      const response = await axios.post(url, formData);
      if (isLogin) {
        localStorage.setItem('token', response.data.token);

        // Redirect to the localities page after login
        navigate('/localities');
      } else {
        alert('Signup successful!');
        setIsLogin(true);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred.');
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('https://students-zone.onrender.com/api/auth/forgot-password', { email: forgotPasswordEmail });
      setForgotPasswordMessage(response.data.message);
    } catch (error) {
      setForgotPasswordMessage('Error sending reset link. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            {showForgotPassword ? (
              <div>
                <h5>Forgot Password</h5>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  />
                </div>
                <button onClick={handleForgotPassword} className="btn btn-primary w-100">
                  Send Reset Link
                </button>
                {forgotPasswordMessage && <p className="text-success mt-3">{forgotPasswordMessage}</p>}
                <button onClick={() => setShowForgotPassword(false)} className="btn btn-link w-100 mt-2">
                  Back to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {!isLogin && (
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
                )}
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
                <button type="submit" className="btn btn-primary w-100">
                  {isLogin ? 'Login' : 'Signup'}
                </button>
                {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
              </form>
            )}

            {isLogin && !showForgotPassword && (
              <div>
                <div className="mt-3 text-center">
                  <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
                    {isLogin ? 'Create an account' : 'Already have an account? Login'}
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <button onClick={() => setShowForgotPassword(true)} className="btn btn-link">
                    Forgot Password?
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;