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
    const { userid, username, email, phone, section, travelerDetails, guideDetails, parkingOwnerDetails, parkingAreaDetails } = req.body;

    try {
        // Find the user by ID
        const user = await userModel.findById(userid);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }

        // Update basic user info
        if (username) user.username = username;
        if (email) user.email = email;
        if (phone) user.phone = phone;

        // Update section-specific details
        switch (section) {
            case 'guide':
                if (guideDetails) {
                    const updatedGuide = await guideModel.findOneAndUpdate(
                        { user_id: user._id },
                        { ...guideDetails },
                        { new: true }
                    );
                    if (!updatedGuide) {
                        return res.status(404).send({
                            message: "Guide details not found",
                            success: false,
                        });
                    }
                }
                break;

            case 'traveler':
                if (travelerDetails) {
                    const updatedTraveler = await TravelerModel.findOneAndUpdate(
                        { user_id: user._id },
                        { ...travelerDetails },
                        { new: true }
                    );
                    if (!updatedTraveler) {
                        return res.status(404).send({
                            message: "Traveler details not found",
                            success: false,
                        });
                    }
                }
                break;

            case 'parking-slot-owner':
                if (parkingOwnerDetails) {
                    const updatedParkingOwner = await ParkingOwnerModel.findOneAndUpdate(
                        { user_id: user._id },
                        { ...parkingOwnerDetails },
                        { new: true }
                    );
                    if (!updatedParkingOwner) {
                        return res.status(404).send({
                            message: "Parking slot owner details not found",
                            success: false,
                        });
                    }

                    if (parkingAreaDetails) {
                        const updatedParkingArea = await ParkingAreaModel.findOneAndUpdate(
                            { parking_owner_id: updatedParkingOwner._id },
                            { ...parkingAreaDetails },
                            { new: true }
                        );
                        if (!updatedParkingArea) {
                            return res.status(404).send({
                                message: "Parking area details not found",
                                success: false,
                            });
                        }
                    }
                }
                break;

            default:
                return res.status(400).send({
                    message: "Invalid section type",
                    success: false,
                });
        }

        // Save the updated user details
        await user.save();

        res.status(200).send({
            message: "Profile updated successfully",
            success: true,
        });
    } catch (error) {
        console.error("Error in editProfileController:", error);
        res.status(500).send({
            message: "Error updating profile",
            success: false,
            error: error.message,
        });
    }
};

module.exports = { getProfileController, editProfileController };




