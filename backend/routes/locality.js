const express = require('express');
const router = express.Router();
const localityController = require('../controllers/localityController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

// Get Mess services
router.get('/mess/:city', authMiddleware(), localityController.getMessByCity);

// Get PG Rooms
router.get('/rooms/:city', authMiddleware(), localityController.getRoomsByCity);

// Add a new locality - Admin only
router.post(
  '/',
  authMiddleware('admin'),
  [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('owner', 'Owner name is required').not().isEmpty(),
    check('contact', 'Contact is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('mapLink', 'Google Map link is required').isURL()
  ],
  localityController.addLocality
);

// Get all localities
router.get('/', authMiddleware(), localityController.getAllLocalities);

// Update a locality - Admin only
router.put('/:id', authMiddleware('admin'), localityController.updateLocality);

// Delete a locality - Admin only
router.delete('/:id', authMiddleware('admin'), localityController.deleteLocality);

module.exports = router;