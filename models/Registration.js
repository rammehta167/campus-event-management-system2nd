const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  teammates: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed'],
    default: 'confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-validate to generate ticketId if not present
RegistrationSchema.pre('validate', function (next) {
  if (!this.ticketId) {
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // 5 digit random number
    this.ticketId = `URJ-${randomDigits}`;
  }
  next();
});

module.exports = mongoose.model('Registration', RegistrationSchema);
