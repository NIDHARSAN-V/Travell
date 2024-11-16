import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import HomePage from './Screens/HomePage';
import { UserDataProvider } from './UserContext/UserDataContext';
import Navbar from './Components/Navbar';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen'; 
import UsersProfile from './Screens/UsersProfile'; 
import ParkingStream from './Screens/ParkingStream'; 
import Traveler_GuidePage from './Screens/Traveler_GuidePage';
import GuideVerification from './Screens/GuideVerification';
import AboutUs from './Screens/AboutUs';
import Services from './Screens/Services';
import HospitalNear from './Screens/HospitalNear';
import ContactUs from './Screens/ContactUs';
import GuideBookingView from './Screens/GuideBookingView';
import LocationInfo from './Screens/LocationInfo';
import EVStation from './Screens/EVStation';
import { UserPlaceProvider } from './UserContext/PlaceContext';
// import LocData from './Screens/LocData';

function App() {
  return (
    <UserDataProvider>
      <UserPlaceProvider>
        <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/register" element={<RegisterScreen />} /> 
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<UsersProfile/>} /> 
            <Route path="/park" element={<ParkingStream/>} />
            <Route path="/guide_list" element={<Traveler_GuidePage/>} />
            <Route path="/guide_verify" element={<GuideVerification/>} /> 
            <Route path="/about_us" element={<AboutUs/>} /> 
            <Route path="/services" element={<Services/>} /> 
            <Route path="/hospital" element={<HospitalNear/>} /> 
            <Route path="/contact" element={<ContactUs/>} />
            <Route path="/guide_booking_view" element={<GuideBookingView/>} /> 
            <Route path="/location_info" element={<LocationInfo/>} />
            <Route path="/ev" element={<EVStation/>} /> 
            {/* <Route path="/loc" element={<LocData/>} />  */}
          </Routes>
        </BrowserRouter>
      </UserPlaceProvider>
    </UserDataProvider>
  );
}

export default App;
