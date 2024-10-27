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
    required: [true, "Phone number is required"], 
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  section: {
    type: String,
    enum: ["traveler", "parking-slot-owner", "guide"], 
    required: [true, "Section is required"], 
  },
}, {
  timestamps: true, 
});

const userModel = mongoose.model("User", userSchema); 

module.exports = userModel; 
