const userModel = require("../Models/usermodel");
const guideModel = require("../Models/GuideModel");

const book_guide = async function(req, res) {
  const { guideId, userId, date } = req.body;

  console.log("------------------------------------")
  try {
    console.log("Guide ID:", guideId);
    
    console.log("Userid--------------:",req.userid)
    // Fetch the guide by ID
    const guide = await guideModel.findById(guideId);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    
    // Check if bookings array exists, initialize if not
    if (!Array.isArray(guide.bookings)) {
      guide.bookings = [];
    }
    
    
    // Add the new booking to the bookings array
    guide.bookings.push({
      user_id: req.userid,
      date: new Date(date) // Convert date string to Date object
    });

    // Save the updated guide document with the new booking
    await guide.save();

    res.status(200).json({ guideName: guide.name, message: 'Booking successful' });
  } catch (error) {
    console.error("Error booking guide:", error);
    res.status(500).json({ message: 'Booking failed', error });
  }
};

module.exports = { book_guide };
