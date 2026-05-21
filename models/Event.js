const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['technical', 'cultural', 'sports'],
    required: [true, 'Please select an event category']
  },
  subCategory: {
    type: String,
    required: [true, 'Please specify a sub-category']
  },
  date: {
    type: String,
    required: [true, 'Please specify the event date']
  },
  time: {
    type: String,
    required: [true, 'Please specify the event time']
  },
  venue: {
    type: String,
    required: [true, 'Please specify the venue']
  },
  teamSize: {
    type: Number,
    default: 1
  },
  fee: {
    type: Number,
    default: 0
  },
  prize: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  rules: {
    type: [String],
    default: []
  },
  contact: {
    type: String,
    required: [true, 'Please specify a coordinator contact info']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);
