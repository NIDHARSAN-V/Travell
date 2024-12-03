import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from '../Styles/RegisterScreen.module.css';

function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [section, setSection] = useState('traveler'); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
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
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
    exit: { opacity: 0, x: '100vw', transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div 
      className={styles.outerdiv}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className={styles.image} variants={imageVariants}>
        <img src="/home_bg.jpg" alt="" />
      </motion.div>
      
      <motion.div className={styles.loginForm} variants={formVariants}>
        <div className={styles.text}>Register Here</div>
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          
          <motion.div 
            className={styles.field} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </motion.div>

          <motion.div 
            className={styles.field} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          <motion.div 
            className={styles.field} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="number"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </motion.div>

          <motion.div className={styles.field} whileHover={{ scale: 1.05 }}>
            <select onChange={(e) => setSection(e.target.value)} required>
              <option value="traveler">Traveler</option>
              <option value="parking-slot-owner">Parking Slot Owner</option>
              <option value="guide">Guide</option>
            </select>
          </motion.div>

          <motion.div 
            className={styles.field} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.div 
            className={styles.field} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.button 
            type="submit" 
            className={styles.submitButton} 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </motion.button>
          
          <div className={styles.link}>
            Already a User?{' '}
            <Link to="/login">Login now</Link>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default RegisterScreen;
