import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from '../UserContext/UserDataContext';
import styles from '../Styles/ProfileScreen.module.css';

function UsersProfile() {
    const { UserId } = useContext(UserDataContext);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [travelerDetails, setTravelerDetails] = useState(null);
    const [guideDetails, setGuideDetails] = useState(null);
    const [parkingDetails, setParkingDetails] = useState(null);
    const [parkingAreaDetails, setParkingAreaDetails] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.post("http://localhost:8001/profile/get_profile", { userid: UserId });
                setUserProfile(res.data.user);
                setLoading(false);

                // Initialize details based on user section
                if (res.data.user.section === 'traveler') {
                    setTravelerDetails(res.data.user.travelerDetails);
                } else if (res.data.user.section === 'guide') {
                    setGuideDetails(res.data.user.guideDetails);
                } else if (res.data.user.section === 'parking-slot-owner') {
                    setParkingAreaDetails(res.data.user.parkingAreaDetails);
                    setParkingDetails(res.data.user.parkingOwnerDetails);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
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
            setParkingAreaDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        } else {
            setUserProfile((prevProfile) => ({
                ...prevProfile,
                [name]: value,
            }));
        }
    };

    const handleSave = async () => {
        try {
            const updatedUserProfile = {
                ...userProfile,
                parkingAreaDetails,
            };

            await axios.post("http://localhost:8001/profile/update_profile", updatedUserProfile, {
                withCredentials: true,
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile data.");
        }
    };

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>User Profile</h2>
            {userProfile ? (
                <div>
                    <div className={styles.profileSection}>
                        {isEditing ? (
                            <label className={styles.label}>
                                Username:
                                <input
                                    type="text"
                                    name="username"
                                    value={userProfile.username || ''}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            </label>
                        ) : (
                            <p><strong>Username:</strong> {userProfile.username}</p>
                        )}
                        <p><strong>Email:</strong> {userProfile.email}</p>
                        <p><strong>Phone:</strong> {userProfile.phone}</p>
                        <p><strong>Section:</strong> {userProfile.section}</p>
                    </div>

                    {userProfile.section === 'parking-slot-owner' && (
                        <div className={styles.parkingDetails}>
                            <h3>Parking Slot Owner Details</h3>
                            {isEditing ? (
                                <>
                                    <label className={styles.label}>
                                        Parking Location:
                                        <input
                                            type="text"
                                            name="parking_location"
                                            value={parkingAreaDetails?.parking_location || ''}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </label>
                                    <label className={styles.label}>
                                        Camera IP Access:
                                        <input
                                            type="text"
                                            name="camera_ip_access"
                                            value={parkingAreaDetails?.camera_ip_access || ''}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </label>
                                    <label className={styles.label}>
                                        Parking Owner Phone:
                                        <input
                                            type="text"
                                            name="parking_owner_phone"
                                            value={parkingAreaDetails?.parking_owner_phone || ''}
                                            onChange={handleInputChange}
                                            className={styles.input}
                                        />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <p><strong>Parking Location:</strong> {parkingAreaDetails?.parking_location}</p>
                                    <p><strong>Camera IP Access:</strong> {parkingAreaDetails?.camera_ip_access}</p>
                                    <p><strong>Parking Owner Phone:</strong> {parkingAreaDetails?.parking_owner_phone}</p>
                                </>
                            )}
                        </div>
                    )}

                    <div className={styles.buttons}>
                        <button
                            className={`${styles.button} ${styles.buttonEdit}`}
                            onClick={handleEditToggle}
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                        {isEditing && (
                            <button
                                className={`${styles.button} ${styles.buttonSave}`}
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p>No profile data found.</p>
            )}
        </div>
    );
}

export default UsersProfile;



