import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/LoginScreen.module.css';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('');
  const [activeTab, setActiveTab] = useState('User'); // Tabs for User, Admin, Guest
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = { email, phone, password, section, role: activeTab };
    console.log(userdata);

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post('http://localhost:8001/user/login', userdata);
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

  const renderFormFields = () => (
    <div className={`${styles.form} ${styles.formActive}`}>
      <div className={styles.field}>
        <input
          type="text"
          className={`${styles.inputField} ${styles.userInput}`}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <input
          type="text"
          className={`${styles.inputField} ${styles.userInput}`}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          className={`${styles.inputField} ${styles.userInput}`}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className={styles.field}>
        <input
          type="text"
          className={`${styles.inputField} ${styles.userInput}`}
          placeholder="Section"
          onChange={(e) => setSection(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Login
      </button>
    </div>
  );

  return (
    <div className={styles.outerdiv}>
      <div className={styles.loginForm}>
        <div className={styles.loginText}>Login Here</div>

        {/* Tabs for selecting user type */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'Traveler' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('Traveler')}
          >
            Traveler
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'Guide' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('Guide')}
          >
            Guide
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'Parking Slot Owner' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('Parking Slot Owner')}
          >
            Parking Slot Owner
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
