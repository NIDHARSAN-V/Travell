import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';

import HomePage from './Screens/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterScreen />} /> 
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<HomePage/>} /> Home screen
      </Routes>
    </BrowserRouter>
  );
}

export default App;
