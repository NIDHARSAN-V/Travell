import React, { useState } from 'react';
import styles from '../Styles/Navbar.module.css'; // Import the CSS module

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={styles.header}>
            <a href="/" className={styles.logo}>
                <i className="ri-home-heart-fill"></i>
                <span>logo</span>
            </a>

            <ul className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li> 
            </ul>
          
            <div className={styles.main}> 
                <a href="#" className={styles.user}><i className="ri-user-fill"></i>Sign In</a> 
                <a href="#">Register</a> 
                <div className={`bx bx-menu ${styles.menuIcon}`} onClick={toggleMenu}></div> 
            </div> 
        </header>
    );
};

export default Navbar;
