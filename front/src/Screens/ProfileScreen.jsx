import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../UserContext/UserDataContext'; 
import axios from 'axios';

const ProfileScreen = () => {
  const { UserId } = useContext(UserDataContext); 
  const [ProfileData, SetProfileData] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const res = await axios.get('http://localhost:8001/');
        if (res.data.success) { 
          const profiledata = await axios.post('http://localhost:8001/user/profile', { userid: UserId });
          SetProfileData(profiledata.data.user); 
          setEditFormData({
            username: profiledata.data.user.username,
            email: profiledata.data.user.email,
            phone: profiledata.data.user.phone,
          });
        } else {
          alert("Your Profile Data is missing");
        }
      } catch (error) {
        console.log("Error in Profile Screen:", error); 
      } 
    }; 
  
    fetchData(); 
  }, [UserId]); // Adding UserId as a dependency

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle form submission to update profile
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:8001/user/profile/update', {
        userid: UserId,
        ...editFormData,
      });
      if (res.data.success) {
        alert("Profile updated successfully");
        SetProfileData(res.data.user); // Update profile data with the new info
        setIsEditing(false); // Exit edit mode
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.log("Error in updating profile:", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {ProfileData ? (
        <div>
          {isEditing ? (
            
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={editFormData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          ) : (
            // View mode to display profile information
            <div>
              <p>User ID: {ProfileData._id}</p>
              <p>Username: {ProfileData.username}</p>
              <p>Email: {ProfileData.email}</p>
              <p>Phone: {ProfileData.phone}</p>
              <p>Is Admin: {ProfileData.isAdmin ? 'Yes' : 'No'}</p>

              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileScreen;
