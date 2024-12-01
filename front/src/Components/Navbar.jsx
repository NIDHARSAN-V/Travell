import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from "../Styles/Navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Navbar animation variants
    const navbarVariants = {
        hidden: {
            opacity: 0.2, // Start with light opacity
            y: -20, // Slide in from above
        },
        visible: {
            opacity: 1, // Full opacity
            y: 0, // At its normal position
            transition: { duration: 0.8, ease: "easeOut" }, // Smooth transition
        },
    };

    // Sidebar animation variants
    const sidebarVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.2, ease: "easeOut" },
        },
        closed: {
            x: "-100%",
            opacity: 0.5,
            transition: { duration: 0.2, ease: "easeIn" },
        },
    };

    return (
        <motion.header
            className={styles.header}
            initial="hidden"
            animate="visible"
            variants={navbarVariants} // Navbar animation
        >
            {/* Navbar */}
            <motion.ul
                className={styles.navbar}
                initial="hidden"
                animate="visible"
                variants={navbarVariants} // Light opacity effect
            >
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about_us">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="#">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="https://plane-it-travel-ai.vercel.app/plan-a-trip">Planner</a></li>
            </motion.ul>

            {/* Sidebar */}
            <motion.ul
                className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
                initial={false}
                animate={isSidebarOpen ? "open" : "closed"}
                variants={sidebarVariants}
            >
                <li
                    className={styles.sideli}
                    onClick={() => {
                        navigate("/");
                        toggleSidebar();
                    }}
                >
                    Home
                </li>
                <li
                    className={styles.sideli}
                    onClick={() => {
                        navigate("/about_us");
                        toggleSidebar();
                    }}
                >
                    About
                </li>
                <li
                    className={styles.sideli}
                    onClick={() => {
                        navigate("/services");
                        toggleSidebar();
                    }}
                >
                    Services
                </li>
                <li
                    className={styles.sideli}
                    onClick={() => {
                        navigate("/contact");
                        toggleSidebar();
                    }}
                >
                    Contact
                </li>
                <li
                    className={styles.sideli}
                    onClick={() => {
                        navigate("/");
                        toggleSidebar();
                    }}
                >
                    Planner
                </li>
            </motion.ul>

            {/* Logo */}
            <Link to="/" className={styles.logo}>
                <i className="ri-home-heart-fill"></i>
                <span>Trip</span>
            </Link>

            {/* Main Section */}
            <div className={styles.main}>
                <Link to="/login" className={styles.user}>
                    <i className="ri-user-fill"></i>SignIn
                </Link>
                <Link to="/register">Register</Link>

                {/* Menu Icon */}
                <motion.div
                    className={styles.menuIcon}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSidebar}
                >
                    <i className="ri-menu-line"></i>
                </motion.div>
            </div>
        </motion.header>
    );
};

export default Navbar;
