const userModel = require("../Models/usermodel");
const guideModel = require("../Models/GuideModel");
const TravelerModel = require("../Models/TravelerModel");
const ParkingOwnerModel = require("../Models/ParkingOwner"); 
const ParkingAreaModel = require("../Models/Parking_Area_Model"); 

const getProfileController = async (req, res) => {
    const { userid } = req.body;

    try {
        const user = await userModel.findById(userid);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }

        let userDetails;

        // Check user's section and fetch details accordingly
        switch (user.section) {
            case 'guide':
                const guideDetails = await guideModel.findOne({ user_id: user._id });
                if (!guideDetails) {
                    return res.status(404).send({
                        message: "Guide details not found",
                        success: false,
                    });
                }
                userDetails = {
                    ...user.toObject(), 
                    guideDetails: guideDetails 
                };
                break;

            case 'traveler':
                const travelerDetails = await TravelerModel.findOne({ user_id: user._id });
                if (!travelerDetails) {
                    return res.status(404).send({
                        message: "Traveler details not found",
                        success: false,
                    });
                }
                userDetails = {
                    ...user.toObject(), 
                    travelerDetails: travelerDetails 
                };
                break;

            case 'parking-slot-owner':
                const parkingOwnerDetails = await ParkingOwnerModel.findOne({ user_id: user._id });
                if (!parkingOwnerDetails) {
                    return res.status(404).send({
                        message: "Parking slot owner details not found",
                        success: false,
                    });
                }

                const parkingAreaDetails = await ParkingAreaModel.findOne({ parking_owner_id: parkingOwnerDetails._id });
                if (!parkingAreaDetails) {
                    return res.status(404).send({
                        message: "Parking area details not found",
                        success: false,
                    });
                }

                userDetails = {
                    ...user.toObject(), // Get basic user details
                    parkingOwnerDetails: parkingOwnerDetails, // Add parking owner details
                    parkingAreaDetails: parkingAreaDetails // Add parking area details
                };
                break;

            default:
                return res.status(400).send({
                    message: "Unknown section type",
                    success: false,
                });
        }

        // Return user details
        res.status(200).send({
            message: "Profile fetched successfully",
            success: true,
            user: userDetails,
        });

    } catch (error) {
        console.error("Error in getProfileController:", error);
        res.status(500).send({
            success: false,
            message: `Error fetching profile: ${error.message}`,
        });
    }
};


const editProfileController = async (req, res) => {
    const { section, _id, parkingAreaDetails } = req.body;

    if (!section || !_id) {
        return res.status(400).send({
            message: "Missing section or user ID",
            success: false,
        });
    }

    try {
        if (section === "traveler") {
            // Handle traveler profile update logic here (if needed)
            // Add logic for updating traveler profile
        } 
        else if (section === "guide") {
            // Handle guide profile update logic here (if needed)
            // Add logic for updating guide profile
        } 
        else if (section === "parking-slot-owner") {
            // Ensure parking owner exists
            const parkingOwnerDetails = await ParkingOwnerModel.findOne({ user_id: _id });
            if (!parkingOwnerDetails) {
                return res.status(404).send({
                    message: "Parking Owner details not found",
                    success: false,
                });
            }

            // Update parking owner details
            if (parkingAreaDetails?.parking_owner_phone) {
                parkingOwnerDetails.phone = parkingAreaDetails.parking_owner_phone;
                await parkingOwnerDetails.save();
            }

            // Find the corresponding parking area details
            const parkingAreaDetailsObj = await ParkingAreaModel.findOne({ parking_owner_id: parkingOwnerDetails._id });
            if (!parkingAreaDetailsObj) {
                return res.status(404).send({
                    message: "Parking area details not found",
                    success: false,
                });
            }

            // Update parking area details
            if (parkingAreaDetails?.parking_location) {
                parkingAreaDetailsObj.parking_location = parkingAreaDetails.parking_location;
            }
            if (parkingAreaDetails?.camera_ip_access) {
                parkingAreaDetailsObj.camera_ip_access = parkingAreaDetails.camera_ip_access;
            }
            if (parkingAreaDetails?.parking_owner_phone) {
                parkingAreaDetailsObj.parking_owner_phone = parkingAreaDetails.parking_owner_phone;
            }

            await parkingAreaDetailsObj.save();

            res.status(200).send({
                message: "Parking details updated successfully",
                success: true,
            });
        } 
        else {
            return res.status(400).send({
                message: "Unknown section type",
                success: false,
            });
        }

    } catch (error) {
        console.error("Error in editProfileController:", error);
        res.status(500).send({
            success: false,
            message: `Error updating profile: ${error.message}`,
        });
    }
}; 

module.exports = { getProfileController, editProfileController };
