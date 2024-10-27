const userModel = require("../Models/usermodel");
const bcrypt = require("bcrypt");
const guideModel = require("../Models/GuideModel");
const TravelerModel = require("../Models/TravelerModel");
const ParkingOwnerModel = require("../Models/ParkingOwner");
const ParkingAreaModel = require("../Models/Parking_Area_Model")

const registerController = async (req, res) => { 
    console.log("User Register Data:"); 
    console.log(req.body); 

    try { 
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send({ message: "User Already Exists", success: false });
        }

        // Check if the phone number is already in use
        const existingPhoneUser = await userModel.findOne({ phone: req.body.phone });
        if (existingPhoneUser) {
            return res.status(409).send({ message: "Phone number already in use", success: false });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user instance
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            section: req.body.section,
            password: hashedPassword,
            isAdmin: false
        });

        await newUser.save();

        if (newUser.section === 'guide') {
            console.log("Stored Guide");
            const location = 'Erode';

            const newGuide = new guideModel({
                user_id: newUser._id,
                name: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                location: location,
                ratings: 0,
                reviews: []
            });

            await newGuide.save();
        } 

        else if (newUser.section === 'traveler') {
            const location = "Erode"; 
            console.log("Creating Traveler entry...");

            const newTraveler = new TravelerModel({
                user_id: newUser._id,
                name: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                location: location,
                history_travels: [],
                guide_payments: [],
                parking_payments: [],
                plans_history: []
            });

            try {
                console.log("Saving Traveler...");
                await newTraveler.save();
                console.log("Traveler saved successfully");
            } catch (err) {
                console.error("Error saving Traveler:", err);
                return res.status(500).send({ message: "Error saving Traveler data", success: false });
            }
        }

        else if (newUser.section === 'parking-slot-owner') {
            const location = req.body.location || 'Erode';
            const parkingLocation = req.body.parking_location || 'Not provided';
            const cameraIpAccess = req.body.camera_ip_access || '';
            

            const newParkingOwner = new ParkingOwnerModel({
                user_id: newUser._id,
                name: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                location: location,
                parking_location: parkingLocation,
                camera_ip_access: cameraIpAccess,
                parking_payments: [], 
            });

            try {
                console.log("Saving Parking Owner...");
                await newParkingOwner.save();

/////here comes the error 
                const newParkingArea = new ParkingAreaModel({
                    parking_location: newParkingOwner.parking_location, 

                    parking_owner_id: newParkingOwner._id, 

                    camera_ip_access: newParkingOwner.camera_ip_access,

                    parking_payments: newParkingOwner.parking_payments,
                    
                    no_of_slots_available: 0,
                    total_no_slots: 0,
                    no_of_slots_booked: 0,
                    parking_owner_phone: newParkingOwner.phone,
                  
                });

                console.log("Saving Parking Area...");
                await newParkingArea.save();

                console.log("Parking Area saved successfully");
            } catch (err) {
                console.error("Error saving Parking Owner or Area:", err);
                return res.status(500).send({ message: "Error saving Parking Owner data", success: false });
            }
        }

        res.status(201).send({ message: "Registered Successfully", success: true });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).send({
            success: false,
            message: `Registration Controller: ${error.message}`,
        });
    }
};


module.exports = { registerController };

