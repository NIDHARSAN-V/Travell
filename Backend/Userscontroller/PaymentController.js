const userModel = require("../Models/usermodel");
const guideModel = require("../Models/GuideModel");
const TravelerModel = require("../Models/TravelerModel");
const ParkingOwnerModel = require("../Models/ParkingOwner");
const ParkingAreaModel = require("../Models/Parking_Area_Model");

const Add_parking_payment = async function(req, res) {
    try {
        console.log("Parking Payment processing...");
        console.log("------------------------------------------------------------");
        console.log(req.userid, req.section);

        // Validate userid and section
        if (!req.userid || !req.section) {
            return res.status(400).send("User ID and section are required");
        }

        // Find user by ID
        const user = await userModel.findById(req.userid);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Initialize traveler variable outside of the if block
        let traveler = null;
        
        if (req.section === "traveler") {
            traveler = await TravelerModel.findOne({ user_id: req.userid });
            if (!traveler) {
                return res.status(404).send("Traveler not found");
            }
        }

        console.log("Traveler:", traveler);
        console.log("pppppp",  req.body.payment_data)
        traveler.parking_payments.push(req.body.payment_data);
        await traveler.save();

        // Continue with payment processing or other logic
        res.status(200).send({ 
            message: "Payment processed successfully", 
            success: true 
        });
        

    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).send("Payment processing failed");
    }
};

module.exports = { Add_parking_payment };
