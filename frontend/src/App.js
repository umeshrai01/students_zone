import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Localities from './pages/Localities';
import Contact from './pages/Contact';
import About from './pages/About';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Settings from './components/Settings';
import AuthPage from './pages/AuthPage';
import AddLocality from './pages/AddLocality';  
import './App.css';
import './pages/Home.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/localities" element={<Localities />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/add-locality" element={<AddLocality />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;