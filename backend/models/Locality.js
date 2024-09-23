const mongoose = require('mongoose');

const LocalitySchema = new mongoose.Schema({
  city: { type: String, required: true },
  name: { type: String, required: true },
  owner: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  mapLink: { type: String, required: false },
  type: { type: String, required: true }, // 'mess' or 'room'
  // Add any additional fields here if needed
});

module.exports = mongoose.model('Locality', LocalitySchema);