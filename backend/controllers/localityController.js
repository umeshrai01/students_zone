const Locality = require('../models/Locality');

// Add locality function
const addLocality = async (req, res) => {
  try {
    const newLocality = new Locality(req.body);
    await newLocality.save();
    return res.status(201).json({ message: 'Locality added successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error adding locality' });
  }
};

// Get mess services by city
const getMessByCity = async (req, res) => {
  try {
    const city = req.params.city;
    const messServices = await Locality.find({ city, type: 'mess' });
    res.json(messServices);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching mess services' });
  }
};

// Get rooms by city
const getRoomsByCity = async (req, res) => {
  try {
    const city = req.params.city;
    const rooms = await Locality.find({ city, type: 'room' });
    res.json(rooms);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching rooms' });
  }
};

// Get all localities
const getAllLocalities = async (req, res) => {
  try {
    const localities = await Locality.find();
    res.json(localities);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching localities' });
  }
};

// Update locality function
const updateLocality = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLocality = await Locality.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedLocality) {
      return res.status(404).json({ message: 'Locality not found' });
    }
    res.json(updatedLocality);
  } catch (error) {
    return res.status(500).json({ error: 'Error updating locality' });
  }
};

// Delete locality function
const deleteLocality = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLocality = await Locality.findByIdAndDelete(id);
    if (!deletedLocality) {
      return res.status(404).json({ message: 'Locality not found' });
    }
    res.json({ message: 'Locality deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting locality' });
  }
};

module.exports = { addLocality, getMessByCity, getRoomsByCity, getAllLocalities, updateLocality, deleteLocality };