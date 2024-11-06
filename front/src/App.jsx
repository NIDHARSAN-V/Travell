import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import HomePage from './Screens/HomePage';
import { UserDataProvider } from './UserContext/UserDataContext';
import Navbar from './Components/Navbar';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import UsersProfile from './Screens/UsersProfile'





function App() {
  return (

    <UserDataProvider>

      <Navbar/>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<HomePage />} /> 
          
          <Route path="/register" element={<RegisterScreen />} /> 

          <Route path="/login" element={<LoginScreen />} />

          <Route path="/profile" element={<UsersProfile/>} /> 

          {/* <Route path="/guide" element={<GuideVerification/>} /> 

          <Route path="/traveler_profile" element={<TravelerProfileScreen/>} /> 

          <Route path="/parking_stream" element={<ParkingStream/>} />  */}
           
           {/* <Route path="/map_radius" element={<MapRadius/>}/> */}

        
        </Routes>

      </BrowserRouter>

    </UserDataProvider>
    
    
  );
}

export default App;
