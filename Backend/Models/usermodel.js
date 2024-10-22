const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"], // Added error message
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  section: {
    type: String,
    enum: ["traveler", "parking-slot-owner", "hotel-owner"], // Restrict to valid options
    required: [true, "Section is required"], // Mark section as required
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt timestamps
});

const userModel = mongoose.model("User", userSchema); // Changed model name to "User"

module.exports = userModel; 
