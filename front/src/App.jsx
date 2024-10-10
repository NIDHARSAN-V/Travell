import React from 'react'
import HomeScreen from './Screens/HomeScreen'
import LoginScreen from './Screens/LoginScreen'
import { BrowserRouter } from 'react-router-dom'
import RegisterScreen from './Screens/RegisterScreen'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={RegisterScreen}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
