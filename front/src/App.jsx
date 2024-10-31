import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import HomePage from './Screens/HomePage'; 
import ProfileScreen from './Screens/ProfileScreen'; 
import { UserDataProvider } from './UserContext/UserDataContext'; 
import Navbar from './Components/Navbar';
import "./App.css"
import GuideVerify from './Screens/GuideVerify';
import TravelerProfileScreen from './Screens/TravelerProfileScreen';
import ParkingStream from './Components/ParkingStream';
import UsersProfile from './Screens/UsersProfile';
import GuideVerification from './Screens/GuideVerification';
// import MapRadius from './Screens/MapRadius';

function App() {
  return (

    // <UserDataProvider>

    //   <Navbar/>

    //   <BrowserRouter>

    //     <Routes>

    //       <Route path="/" element={<HomePage />} /> 
          
    //       <Route path="/register" element={<RegisterScreen />} /> 

    //       <Route path="/login" element={<LoginScreen />} />

    //       <Route path="/profile" element={<UsersProfile/>} /> 

    //       <Route path="/guide" element={<GuideVerify/>} /> 

    //       <Route path="/traveler_profile" element={<TravelerProfileScreen/>} /> 

    //       <Route path="/parking_stream" element={<ParkingStream/>} /> 
           
    //        {/* <Route path="/map_radius" element={<MapRadius/>}/> */}

        
    //     </Routes>

    //   </BrowserRouter>

    // </UserDataProvider>
    <>
    <GuideVerification/>
    </>
  );
}

export default App;
