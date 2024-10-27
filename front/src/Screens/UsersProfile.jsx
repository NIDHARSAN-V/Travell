import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../UserContext/UserDataContext';

function UsersProfile() {
    const { UserId } = useContext(UserDataContext);
    const [userProfile, setUserProfile] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);  
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode 
 
    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.post("http://localhost:8001/profile/get_profile", { userid: UserId });
                setUserProfile(res.data.user);
                setLoading(false);
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
        setUserProfile({ ...userProfile, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.post("http://localhost:8001/profile/update_profile", userProfile); // Adjust the endpoint as needed
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

    const renderSectionDetails = () => {
        switch (userProfile.section) {
            case 'traveler':
                return (
                    <div>
                        <h3>Traveler Details</h3>
                        {isEditing ? (
                            <div>
                                <label>
                                    History of Travels:
                                    <input 
                                        type="text" 
                                        name="travelerDetails.history_travels" 
                                        value={userProfile.travelerDetails.history_travels.join(", ")} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                                <label>
                                    Guide Payments:
                                    <input 
                                        type="text" 
                                        name="travelerDetails.guide_payments" 
                                        value={userProfile.travelerDetails.guide_payments.join(", ")} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                                <label>
                                    Parking Payments:
                                    <input 
                                        type="text" 
                                        name="travelerDetails.parking_payments" 
                                        value={userProfile.travelerDetails.parking_payments.join(", ")} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                            </div>
                        ) : (
                            <div>
                                <p><strong>History of Travels:</strong> {userProfile.travelerDetails.history_travels.join(", ") || "No travels found"}</p>
                                <p><strong>Guide Payments:</strong> {userProfile.travelerDetails.guide_payments.length || "No payments made"}</p>
                                <p><strong>Parking Payments:</strong> {userProfile.travelerDetails.parking_payments.length || "No parking payments made"}</p>
                            </div>
                        )}
                    </div>
                );
            case 'guide':
                return (
                    <div>
                        <h3>Guide Details</h3>
                        {isEditing ? (
                            <div>
                                <label>
                                    Location:
                                    <input 
                                        type="text" 
                                        name="guideDetails.location" 
                                        value={userProfile.guideDetails.location} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                                <label>
                                    Ratings:
                                    <input 
                                        type="text" 
                                        name="guideDetails.ratings" 
                                        value={userProfile.guideDetails.ratings} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                                <label>
                                    Reviews:
                                    <input 
                                        type="text" 
                                        name="guideDetails.reviews" 
                                        value={userProfile.guideDetails.reviews.join(", ")} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Location:</strong> {userProfile.guideDetails.location}</p>
                                <p><strong>Ratings:</strong> {userProfile.guideDetails.ratings || "No ratings yet"}</p>
                                <p><strong>Reviews:</strong> {userProfile.guideDetails.reviews.length ? userProfile.guideDetails.reviews.join(", ") : "No reviews yet"}</p>
                            </div>
                        )}
                    </div>
                );
            case 'parking-slot-owner':
                return (
                    <div>
                        <h3>Parking Slot Owner Details</h3>
                        {isEditing ? (
                            <div>
                                <label>
                                    Parking Location:
                                    <input 
                                        type="text" 
                                        name="parkingOwnerDetails.parking_location" 
                                        value={userProfile.parkingOwnerDetails.parking_location} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                                <label>
                                    Camera IP Access:
                                    <input 
                                        type="text" 
                                        name="parkingOwnerDetails.camera_ip_access" 
                                        value={userProfile.parkingOwnerDetails.camera_ip_access} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                                <label>
                                    Number of Slots:
                                    <input 
                                        type="number" 
                                        name="parkingAreaDetails.total_no_slots" 
                                        value={userProfile.parkingAreaDetails.total_no_slots} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                                <label>
                                    Number of Booked Slots:
                                    <input 
                                        type="number" 
                                        name="parkingAreaDetails.no_of_slots_booked" 
                                        value={userProfile.parkingAreaDetails.no_of_slots_booked} 
                                        onChange={handleInputChange} 
                                    />
                                </label>
                            </div>
                        ) : (
                            <div>
                                <p><strong>Parking Location:</strong> {userProfile.parkingOwnerDetails.parking_location || "Not provided"}</p>
                                <p><strong>Camera IP Access:</strong> {userProfile.parkingOwnerDetails.camera_ip_access || "Not provided"}</p>
                                <p><strong>Number of Slots:</strong> {userProfile.parkingAreaDetails.total_no_slots || 0}</p>
                                <p><strong>Number of Booked Slots:</strong> {userProfile.parkingAreaDetails.no_of_slots_booked || 0}</p>
                            </div>
                        )}
                    </div>
                );
            default:
                return <p>Unknown section.</p>;
        }
    };

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
                    {renderSectionDetails()}
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
