const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

// Get user profile (protected route)
router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;