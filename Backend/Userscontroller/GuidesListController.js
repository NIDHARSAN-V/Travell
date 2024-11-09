const userModel = require("../Models/usermodel");
const guideModel = require("../Models/GuideModel");
const TravelerModel = require("../Models/TravelerModel");
const ParkingOwnerModel = require("../Models/ParkingOwner");
const ParkingAreaModel = require("../Models/Parking_Area_Model");
// const { default: GuideVerification } = require("../../front/src/Screens/GuideVerification");

const get_guide_List = async function(req,res)
{
    try {
        // Fetch all guides from the database
        const guides = await guideModel.find();  // You can modify this query based on your needs (e.g., pagination)
        console.log("Guides List")
        // Check if guides exist
        if (!guides || guides.length === 0) {
          return res.status(404).json({ message: "No guides found" });
        }
    
        // Send the guides data in the response
        res.status(200).json(guides);
      } catch (error) {
        console.error("Error fetching guides:", error);
        res.status(500).json({ message: "Error fetching guides", success: false });
      }
}

module.exports = {get_guide_List}