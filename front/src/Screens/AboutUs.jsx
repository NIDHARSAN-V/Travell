import React from 'react';
import styles from '../Styles/AboutUs.module.css'; // Import the CSS file

function AboutUs() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>

      <h2 className={styles.subtitle}>Founders</h2>
      <ul className={styles.foundersList}>
        <li className={styles.founder}>Nidharsan</li>
        <li className={styles.founder}>Mugesh</li>
        <li className={styles.founder}>Praveen</li>
      </ul>

      <h2 className={styles.subtitle}>Features We Provide for Travelers</h2>
      <ul className={styles.featuresList}>
        <li className={styles.feature}>Real-time data verification for accurate travel information</li>
        <li className={styles.feature}>Certified guide availability with high security</li>
        <li className={styles.feature}>Smart parking solutions for a hassle-free experience</li>
        <li className={styles.feature}>Seamless booking and trip management</li>
        <li className={styles.feature}>Personalized recommendations based on traveler preferences</li>
        <li className={styles.feature}>24/7 customer support for travel assistance</li>
        <li className={styles.feature}>Multi-language support for international travelers</li>
        <li className={styles.feature}>Interactive maps for easy navigation</li>
        <li className={styles.feature}>Exclusive deals on travel packages and accommodations</li>
      </ul>
    </div>
  );
}

export default AboutUs;
