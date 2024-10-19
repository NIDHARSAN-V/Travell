import React, { useState } from 'react';
// import "../styles/Registerstyle.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterScreen() {

  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [section, setsection] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();

  
  const userdata = {
    username,
    email,
    phone,
    section,
    password,
    confirmpassword,
  };


  const handleSubmit = async function (e) {
    e.preventDefault(); 
    console.log(userdata);
    try {
      const res = await axios.post("http://localhost:5432/user/register", userdata);
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="outerdiv">
      <div className="login-form">
        <div className="text">Register Here</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="fas fa-envelope" />
            <input
              type="text"
              placeholder="Name"
              name="username"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="field">
            <div className="fas fa-envelope" />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="field">
            <div className="fas fa-envelope" />
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              onChange={(e) => setphone(e.target.value)}
            />
          </div>
          <div className="field">
            <div className="fas fa-envelope" />
            <select
              name="section"
              onChange={(e) => setsection(e.target.value)}
            >
              <option value="traveler">Traveler</option>
              <option value="parking-slot-owner">Parking Slot Owner</option>
              <option value="hotel-owner">Hotel Owner</option>
            </select>
          </div>
          <div className="field">
            <div className="fas fa-lock" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="field">
            <div className="fas fa-lock" />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              onChange={(e) => setconfirmpassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
          <div className="link">
            Already a User?{" "}
            <Link to="/Login">
              <a href="#">Login now</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
