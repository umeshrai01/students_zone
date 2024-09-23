const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport'); // Ensure Passport strategies are configured here

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const localityRoutes = require('./routes/locality');
const userRoutes = require('./routes/user');

const app = express();

// CORS setup, allow credentials and frontend domain
const corsOptions = {
  origin: 'http://localhost:3000', // Ensure this matches the frontend's address
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (e.g., cookies or session headers)
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions)); // Enable CORS for the app

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // To handle URL-encoded form data

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', // Keep session secret in .env
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save new sessions even if not modified
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/locality', localityRoutes); // Locality routes
app.use('/api/user', userRoutes); // User routes

// Start server
const PORT = process.env.PORT || 5001; // Use the correct port from env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});