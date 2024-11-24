import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../UserContext/UserDataContext';
import { UserPlaceContext } from '../UserContext/PlaceContext';
import styles from '../Styles/HomePage.module.css';

function HomePage() {
  const [Auth, SetAuth] = useState(false);
  const { UpdateUserData } = useContext(UserDataContext);
  const [Data, SetData] = useState({});
  const [ProfileComplete, SetProfileComplete] = useState(true);
  const navigate = useNavigate();
  const { UpdatePlaceData } = useContext(UserPlaceContext);
  const [place, setPlace] = useState('');

  useEffect(() => {
    const FetchAuth = async () => {
      try {
        const res = await axios.get('http://localhost:8001/');
        if (res.data.success) {
          SetData(res.data);
          UpdateUserData(res.data.userid, res.data.section);
          SetAuth(true);
        } else {
          SetAuth(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    FetchAuth();
  }, [UpdateUserData]);

  useEffect(() => {
    const CheckProfileCompletion = async () => {
      if (Data.userid) {
        try {
          const res = await axios.get(`http://localhost:8001/profile/${Data.userid}`);
          if (!res.data.complete) {
            SetProfileComplete(false);
            navigate("/profile");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    if (Auth) CheckProfileCompletion();
  }, [Auth, Data.userid, navigate]);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8001/logout');
      window.location.reload(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetStarted = () => {
    if (place) {
      UpdatePlaceData(place);
    } else {
      alert("Please enter a place to proceed!");
    }
  };

  return (
    <div className={styles.container}>
      {Auth ? (
        <>
          <div className={styles.welcomeMessage}>
            <h1>Welcome to Traveler</h1>
          </div>
          <div className={styles.gridContent}>
            <div className={styles.getStarted}>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Enter the place to travel"
              />
              <button onClick={handleGetStarted}>Get Started</button>
            </div>
            <div className={styles.features}>
              <h2>Navigate</h2>
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button onClick={() => navigate("/guide_list")}>Guide List</button>
              <button onClick={() => navigate("/ev")}>EV Station</button>
              <button onClick={() => navigate("/guide_booking_view")}>Guide Booking View</button>
              <button onClick={() => navigate("/park")}>Parking Stream</button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.notAuthorizedContainer}>
          <h1>You Are Not Authorized to the Home Page</h1>
          <Link to="/login" className={styles.loginLink}>Login</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
