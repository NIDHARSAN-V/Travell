import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../UserContext/UserDataContext'; 
import axios from 'axios';

const ProfileScreen = () => {
  const { UserId, UserSection } = useContext(UserDataContext); 
  const [ProfileData, SetProfileData] = useState(null); 
 
  console.log("ProfileScreen - UserId:", UserId); 
  console.log("ProfileScreen - UserSection:", UserSection); 
 
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const res = await axios.get('http://localhost:8001/');
        console.log("In Profile Screen Data:", res.data); 

        if (res.data.success) { 
          const profiledata = await axios.post('http://localhost:8001/user/profile', { userid: UserId });
          console.log("Profile Data from Backend User: ", profiledata.data.user);
          SetProfileData(profiledata.data.user); 
        } else {
          alert("Your Profile Data is missing");
        }
      } catch (error) {
        console.log("Error in Profile Screen:", error); 
      } 
    }; 
  
    fetchData(); 
  }, []); 
 
  return (
    <div>
      <h1>User Data</h1>
      {ProfileData ? ( 
        <div>
          <p>User ID: {ProfileData._id}</p>
          <p>Username: {ProfileData.username}</p>
          <p>Email: {ProfileData.email}</p>
          <p>Phone: {ProfileData.phone}</p>
          <p>Is Admin: {ProfileData.isAdmin ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading...</p> 
      )}
    </div> 
  ); 
};

export default ProfileScreen; 
