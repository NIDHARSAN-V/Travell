import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../UserContext/UserDataContext';

function UsersProfile() {
    const { UserId } = useContext(UserDataContext);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

    // Separate states for each section type
    const [travelerDetails, setTravelerDetails] = useState(null);
    const [guideDetails, setGuideDetails] = useState(null);
    const [parkingDetails, setParkingDetails] = useState(null);
    const [parkingAreaDetails, setParkingAreaDetails] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.post("http://localhost:8001/profile/get_profile", { userid: UserId });
                console.log("Profile get : " , res.data.user)
                setUserProfile(res.data.user);
                setLoading(false);

                // Set details based on section
                if (res.data.user.section === 'traveler') {
                    setTravelerDetails(res.data.user.travelerDetails);
                } else if (res.data.user.section === 'guide') {
                    setGuideDetails(res.data.user.guideDetails);
                } else if (res.data.user.section === 'parking-slot-owner') {
                    setParkingAreaDetails(res.data.user.parkingAreaDetails);
                    setParkingDetails(res.data.user.parkingOwnerDetails);
                }

            } catch (error) {
                console.error("Error in Users Profile: ", error);
                setError("Failed to fetch profile data.");
                setLoading(false);
            }
        };

        if (UserId) {
            getProfile();
        }
    }, [UserId]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (userProfile.section === 'parking-slot-owner') {
            if (name === 'camera_ip_access') {
                setParkingAreaDetails({ ...parkingAreaDetails, camera_ip_access: value });
            } else if (name === 'parking_location') {
                setParkingAreaDetails({ ...parkingAreaDetails, parking_location: value });
            } else if (name === 'parking_owner_phone') {
                setParkingAreaDetails({ ...parkingAreaDetails, parking_owner_phone: value });
            }
        }
    };

    const handleSave = async () => {
        try {
            // Prepare updated data for the backend
            const updatedUserProfile = {
                ...userProfile,
                parkingAreaDetails, // Updated parkingAreaDetails
            };

            // Update based on the section
            if (userProfile.section === 'parking-slot-owner') {
                console.log("ksjdhaflkjsdhfkajsdhf")
                const res = await axios.post(
                    "http://localhost:8001/profile/update_profile",
                    updatedUserProfile,
                    {
                      withCredentials: true,
                    }
                  );
             console.log("Response in Park Profile:",res)
            }

            setIsEditing(false); // Exit editing mode after saving
        } catch (error) {
            console.error("Error updating profile: ", error);
            setError("Failed to update profile data.");
        }
    };

    // Display loading, error, or the profile data
    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const renderParkingDetails = () => (
        <div>
            <h3>Parking Slot Owner Details</h3>
            {isEditing ? (
                <div>
                    <label>
                        Parking Location:
                        <input
                            type="text"
                            name="parking_location"
                            value={parkingAreaDetails.parking_location}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Camera IP Access:
                        <input
                            type="text"
                            name="camera_ip_access"
                            value={parkingAreaDetails.camera_ip_access}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Parking Owner Phone:
                        <input
                            type="text"
                            name="parking_owner_phone"
                            value={parkingAreaDetails.parking_owner_phone}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
            ) : (
                <div>
                    <p><strong>Parking Location:</strong> {parkingAreaDetails.parking_location}</p>
                    <p><strong>Camera IP Access:</strong> {parkingAreaDetails.camera_ip_access}</p>
                    <p><strong>Parking Owner Phone:</strong> {parkingAreaDetails.parking_owner_phone}</p>
                </div>
            )}
        </div>
    );

    return (
        <div>
            <h2>User Profile</h2>
            {userProfile ? (
                <div>
                    {isEditing ? (
                        <div>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    name="username" 
                                    value={userProfile.username} 
                                    onChange={handleInputChange} 
                                />
                            </label>
                        </div>
                    ) : ( 
                        <p><strong>Username:</strong> {userProfile.username}</p> 
                    )}
                    <p><strong>Email:</strong> {userProfile.email}</p>
                    <p><strong>Phone:</strong> {userProfile.phone}</p>
                    <p><strong>Section:</strong> {userProfile.section}</p>
                     
                    {userProfile.section === 'parking-slot-owner' && renderParkingDetails()} 

                    <button onClick={handleEditToggle}>{isEditing ? "Cancel" : "Edit"}</button> 
                    {isEditing && <button onClick={handleSave}>Save</button>} 
                </div> 
            ) : ( 
                <p>No profile data found.</p> 
            )} 
        </div> 
    ); 
} 

export default UsersProfile;
