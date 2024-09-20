const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const localityRoutes = require('./routes/locality');
const userRoutes = require('./routes/user');

const app = express();

const corsOptions = {
  origin: 'https://umeshrai01.github.io', // Replace with your frontend's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable if you're dealing with cookies
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/locality', localityRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 10000; // Make sure this is set correctly
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));