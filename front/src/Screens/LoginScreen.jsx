import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function LoginScreen() { 
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState(''); // Added phone field 
  const [password, setPassword] = useState(''); 
  const [section, setSection] = useState(''); // Added section field
  const navigate = useNavigate();

  const handleSubmit = async function(e) {
    e.preventDefault();
    const userdata = { email, phone, password, section }; 
    console.log(userdata);
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post('http://localhost:8001/user/login', userdata);
      console.log(res.data.message);
      if (res.data.success) {
        console.log(res.data.user);
        console.log(res.data.token); 
        navigate('/'); 
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log('Error during login attempt:', error);
    }
  };
 
  return ( 
    <div className="outerdiv">
        
      <div className="login-form">
        <div className="text">Login Here</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            /> 
          </div> 
          <div className="field"> 
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Section"
              name="section"
              onChange={(e) => setSection(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div> 
    </div> 
  ); 
}

export default LoginScreen; 
