const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { protect, admin } = require('../middleware/auth');

// @desc    Register for an event
// @route   POST /api/register
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { event: eventId, teammates } = req.body;

    if (!eventId) {
      return res.status(400).json({ success: false, error: 'Event ID is required' });
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    // Check if user is already registered for this event
    const existingRegistration = await Registration.findOne({
      user: req.user._id,
      event: eventId
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        error: 'You are already registered for this event'
      });
    }

    // Validate teammate count
    // If teamSize is 1, teammates should be empty
    const allowedTeammates = event.teamSize - 1;
    const providedTeammates = teammates ? teammates.filter(t => t.trim() !== '') : [];

    if (providedTeammates.length > allowedTeammates) {
      return res.status(400).json({
        success: false,
        error: `For this event, you can register at most ${allowedTeammates} teammates.`
      });
    }

    // Create registration
    const registration = await Registration.create({
      user: req.user._id,
      event: eventId,
      teammates: providedTeammates,
      status: 'confirmed' // Pre-approved registrations
    });

    // Populate event info
    const populated = await registration.populate('event');

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get logged in student's registrations
// @route   GET /api/register
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('event')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get all registrations (Admin only)
// @route   GET /api/register/all
// @access  Private/Admin
router.get('/all', protect, admin, async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('user', 'name email college phone')
      .populate('event', 'title category date time venue fee')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Update teammates list
// @route   PUT /api/register/:id/teammates
// @access  Private
router.put('/:id/teammates', protect, async (req, res) => {
  try {
    const { teammates } = req.body;

    const registration = await Registration.findById(req.params.id).populate('event');
    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration record not found' });
    }

    // Check ownership
    if (registration.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, error: 'Not authorized to edit this registration' });
    }

    // Validate teammate count
    const allowedTeammates = registration.event.teamSize - 1;
    const providedTeammates = teammates ? teammates.filter(t => t.trim() !== '') : [];

    if (providedTeammates.length > allowedTeammates) {
      return res.status(400).json({
        success: false,
        error: `For this event, you can specify at most ${allowedTeammates} teammates.`
      });
    }

    registration.teammates = providedTeammates;
    await registration.save();

    res.json({ success: true, data: registration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Cancel a registration
// @route   DELETE /api/register/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }

    // Check ownership or admin
    if (registration.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await registration.deleteOne();
    res.json({ success: true, message: 'Registration cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
