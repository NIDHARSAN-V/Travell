const userModel = require("../Models/usermodel");
const bcrypt = require("bcrypt");
const guideModel = require("../Models/GuideModel");
const TravelerModel = require("../Models/TravelerModel");
const ParkingOwnerModel = require("../Models/ParkingOwner"); 
const ParkingAreaModel = require("../Models/Parking_Area_Model");  

const book_guide = async function(req, res) {  
    console.log("IN tRvaller Booking:",req.userid);  
    console.log("Guide Payment List");
    console.log(req.section)

    try {
        if (req.section === "guide") {
            const guide = await guideModel.findOne({ user_id: req.userid });

            if (guide) {
                console.log("Guide Found");
                console.log(guide.bookings);
                let payment_data = [];
                
                for (let i = 0; i < guide.bookings.length; i++) {
                    console.log(guide.bookings[i].user_id); 
                    let id_traveler = guide.bookings[i].user_id;
                    
                    
                    let traveler_details = await TravelerModel.findOne({ user_id: id_traveler });
                    
                    console.log("In  loop :" ,traveler_details )


                    console.log(traveler_details);
                    payment_data.push({
                        traveler: {
                            name: traveler_details.name,
                            email: traveler_details.email,
                            phone: traveler_details.phone,
                            location: traveler_details.location
                        },
                        booking: guide.bookings[i],
                    });
                }
                
                // Send enriched bookings with traveler details as response
                return res.json({ bookings: payment_data });
            } else {
                // Handle case where guide is not found
                return res.status(404).json({ message: "Guide not found" });
            }

        } else {
            // Handle case for other sections if needed
            return res.status(400).json({ message: "Invalid section" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error });
    } 
}; 

module.exports = { book_guide };
