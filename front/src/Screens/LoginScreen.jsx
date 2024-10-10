import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setRole] = useState(''); // Role is either 'Traveler', 'Parking Slot Owner', or 'Hotel Owner'
  const [selectedLogin, setSelectedLogin] = useState(null); // Determines which login form to show
  const navigate = useNavigate();

  const handleSubmit = async function(e) {
    e.preventDefault();
    const userdata = { email, role, password };
    console.log(userdata);
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post('http://localhost:5432/user/login', userdata);
      console.log(res.data.message);
      if (res.data.success) {
        console.log(res.data.user);
        console.log(res.data.tok);
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log('Error during login attempt:', error);
    }
  };

  // Render the role-specific login form based on the selected login
  const renderLoginForm = () => (
    <div className="login-form">
      <div className="text">Login as {selectedLogin}</div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

  return (
    <div className="outerdiv">
      {selectedLogin ? (
        renderLoginForm()
      ) : (
        <div className="login-options">
          <h2>Select Your Role to Login</h2>
          <button
            className="login-btn"
            onClick={() => {
              setRole('Traveler');
              setSelectedLogin('Traveler');
            }}
          >
            Login as Traveler
          </button>
          <button
            className="login-btn"
            onClick={() => {
              setRole('Parking Slot Owner');
              setSelectedLogin('Parking Slot Owner');
            }}
          >
            Login as Parking Slot Owner
          </button>
          <button
            className="login-btn"
            onClick={() => {
              setRole('Hotel Owner');
              setSelectedLogin('Hotel Owner');
            }}
          >
            Login as Hotel Owner
          </button>
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
