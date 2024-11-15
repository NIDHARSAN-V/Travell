import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../UserContext/UserDataContext';
import styles from '../Styles/HomePage.module.css';
import { UserPlaceContext } from '../UserContext/PlaceContext';

function HomePage() {
  const [Auth, SetAuth] = useState(false);
  const { UpdateUserData } = useContext(UserDataContext);
  const [Data, SetData] = useState({});
  const [ProfileComplete, SetProfileComplete] = useState(true); // Track profile completion
  const navigate = useNavigate();
  const { UpdatePlaceData } = useContext(UserPlaceContext);
  const [place, setPlace] = useState(''); // State to track place input

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

  const handleGetStarted = () => {
    if (place) {
      UpdatePlaceData(place); // Update the place in context
      console.log("Place updated to:", place);
    } else {
      alert("Please enter a place to proceed!");
    }
  };

  return (
    <div className={styles.outer}>
      {Auth ? (
        <div className={styles.homecontainer}>
          <header className={styles.homeHeader}>
            <h1>Welcome to Traveler</h1>
            <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
          </header>
          <main className={styles.homeMain}>
            <p>We are glad to have you here. Explore our services and offerings.</p>
          </main>
          <h1>Enter the Place : </h1>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)} // Update local state
            placeholder="Enter the place to travel"
          />
          <p>{Data.message}</p>
          <p>{Data.userid}</p>
          <p>{Data.section}</p>

          {/* Navigation buttons for each route */}
          <div className={styles.navigationButtons}>
            <button onClick={() => navigateTo("/profile")}>Profile</button>
            <button onClick={() => navigateTo("/guide_list")} className={styles.guideListButton}>Guide List</button>
            <button onClick={() => navigateTo("/ev")}>EV Station</button>
            <button onClick={() => navigateTo("/guide_booking_view")}>Guide Booking View</button>
            <button onClick={() => navigateTo("/location_info")}>Location Info</button>
            <button onClick={() => navigateTo("/park")}>Parking Stream</button>
          </div>

          <button className={styles.getStartedButton} onClick={handleGetStarted}>Get Started</button>
        </div>
      ) : (
        <div className={styles.notAuthorizedContainer}>
          <h1>You Are Not Authorized to the Home Page</h1>
          <p className={styles.noWayHome}>NO WAY HOME</p>
          <Link to="/login" className={styles.loginLink}>Login</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
