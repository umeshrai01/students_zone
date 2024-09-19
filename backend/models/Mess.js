const mongoose = require('mongoose');

const MessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  owner: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  mapLink: { type: String }
});

module.exports = mongoose.model('Mess', MessSchema);