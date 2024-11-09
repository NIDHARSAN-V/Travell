const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users', 
  }, 
  name: { 
    type: String, 
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"], 
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    reviewText: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  bookings: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', // Reference to the user who made the booking
    },
    date: {
      type: Date,
      required: true, // Date of the booking
    },
  }],
}, {
  timestamps: true, 
});

const guideModel = mongoose.model("Guide", guideSchema); 

module.exports = guideModel;
