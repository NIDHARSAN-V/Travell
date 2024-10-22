import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import HomePage from './Screens/HomePage'; 
import ProfileScreen from './Screens/ProfileScreen'; 
import { UserDataProvider } from './UserContext/UserDataContext'; 
import Navbar from './Components/Navbar';
import "./App.css"

function App() {
  return (
    <UserDataProvider>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/register" element={<RegisterScreen />} /> 
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} /> 
        </Routes>
      </BrowserRouter>
    </UserDataProvider>
  );
}

export default App;
