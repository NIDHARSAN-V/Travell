import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import "./App.css"
import ParkingStream from './Screens/ParkingStream';



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

    //       <Route path="/guide" element={<GuideVerification/>} /> 

    //       <Route path="/traveler_profile" element={<TravelerProfileScreen/>} /> 

    //       <Route path="/parking_stream" element={<ParkingStream/>} /> 
           
    //        {/* <Route path="/map_radius" element={<MapRadius/>}/> */}

        
    //     </Routes>

    //   </BrowserRouter>

    // </UserDataProvider>
    <>
    <ParkingStream/>
    </>
    
  );
}

export default App;
