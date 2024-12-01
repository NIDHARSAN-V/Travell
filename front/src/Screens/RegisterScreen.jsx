import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../Styles/RegisterScreen.module.css';

function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [section, setSection] = useState('traveler'); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use "navigate" here
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const userdata = { username, email, phone, section, password, confirmPassword };

    try {
      const res = await axios.post('http://localhost:8001/user/register', userdata);
      console.log(res.data.message);
      window.location.href = "/login";
      // Correct usage of navigate here
      
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.outerdiv}>


      <div className={styles.image}>
         <img src="/home_bg.jpg" alt="" />
      </div>
      <div className={styles.loginForm}>
        <div className={styles.text}>Register Here</div>
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <input
              type="number"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <select onChange={(e) => setSection(e.target.value)} required>
              <option value="traveler">Traveler</option>
              <option value="parking-slot-owner">Parking Slot Owner</option>
              <option value="guide">Guide</option>
            </select>
          </div>
          <div className={styles.field}>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>Sign Up</button>
          <div className={styles.link}>
            Already a User?{' '}
            <Link to="/login">Login now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
