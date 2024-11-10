import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../UserContext/UserDataContext';
import styles from '../Styles/HomePage.module.css';

function HomePage() {
  const [Auth, SetAuth] = useState(false);
  const { UpdateUserData } = useContext(UserDataContext);
  const [Data, SetData] = useState({});
  const [ProfileComplete, SetProfileComplete] = useState(true); // Track profile completion
  const navigate = useNavigate();

  useEffect(() => {
    const FetchAuth = async function () {
      try {
        const res = await axios.get('http://localhost:8001/');
        console.log("In Home Screen Data:", res.data);

        if (res.data.success) {
          SetData(res.data);
          UpdateUserData(res.data.userid, res.data.section);
          SetAuth(true);
        } else {
          SetAuth(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    FetchAuth();
  }, [UpdateUserData]);

  useEffect(() => {
    const CheckProfileCompletion = async function () {
      if (Data.userid) {
        try {
          const res = await axios.get(`http://localhost:8001/profile/${Data.userid}`);
          console.log("Profile Check:", res.data);

          if (!res.data.complete) {
            SetProfileComplete(false);
            navigate("/profile"); // Redirect to profile if incomplete
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (Auth) {
      CheckProfileCompletion();
    }
  }, [Auth, Data.userid, navigate]);

  axios.defaults.withCredentials = true;

  const handleLogout = async function () {
    try {
      const res = await axios.get('http://localhost:8001/logout');
      if (res) {
        window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.outer}>
      <button onClick={() => navigateTo("/profile")}>Profile</button>
      <button onClick={() => navigateTo("/guide_list")} className={styles.guideListButton}>Guide List</button>
      {Auth ? (
        <div className={styles.homecontainer}>
          <header className={styles.homeHeader}>
            <h1>Welcome to Traveler</h1>
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </header>
          <main className={styles.homeMain}>
            <p>We are glad to have you here. Explore our services and offerings.</p>
          </main>
          <p>{Data.message}</p>
          <p>{Data.userid}</p>
          <p>{Data.section}</p>
        </div>
      ) : (
        <div className={styles.notAuthorizedContainer}>
          <h1>You Are Not Authorized to the Home Page</h1>
          <p className={styles.noWayHome}>NO WAY HOME</p>
          <Link to="/login" className={styles.loginLink}>Login</Link>
        </div>
      )}

      {/* Navigation buttons for each route */}
      <div className={styles.navigationButtons}>
       
        
       
      
     
        <button onClick={() => navigateTo("/hospital")}>Hospital Near</button>
        <button onClick={() => navigateTo("/ev")}>EV Station</button>
        <button onClick={() => navigateTo("/guide_booking_view")}>Guide Booking View</button>
        
        <button onClick={() => navigateTo("/location_info")}>Location Info</button>
        <button onClick={() => navigateTo("/park")}>Parking Stream</button>
      </div>

      <button className={styles.getStartedButton}>Get Started</button>
    </div>
  );
}

export default HomePage;
