const express = require('express');
const Appointment = require('../models/Appointment');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/guest', async (req, res) => {
  try {
    const { propertyId, fullName, email, phone, date, time } = req.body;
    const appointment = await Appointment.create({ property: propertyId, user: null, fullName, email, phone, date, time });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { propertyId, fullName, email, phone, date, time } = req.body;
    const appointment = await Appointment.create({
      property: propertyId,
      user: req.user._id,
      fullName: fullName || req.user.name,
      email: email || req.user.email,
      phone,
      date,
      time,
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/my', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [{ user: req.user._id }, { email: req.user.email }],
    }).populate('property', 'title location price images').sort('-createdAt');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id/cancel', protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    appointment.status = 'cancelled';
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;