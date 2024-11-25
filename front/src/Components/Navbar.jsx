import React, { useState } from 'react';
import styles from "../Styles/Navbar.module.css"
import { Link } from 'react-router-dom';

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
                <li><a href="/">Home</a></li>
                <li><a href="/about_us">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="/contact">Contact</a></li> 
                <li><a href="https://plane-it-travel-ai.vercel.app/plan-a-trip">Planner</a></li> 
            </ul>

          
            <div className={styles.main}> 
                <a href="/login" className={styles.user}><i className="ri-user-fill"></i>Sign In</a> 
                <a href="/register">Register</a> 
                <div className={`bx bx-menu ${styles.menuIcon}`} onClick={toggleMenu}></div> 
            </div> 
        </header>
    );
};

export default Navbar;
