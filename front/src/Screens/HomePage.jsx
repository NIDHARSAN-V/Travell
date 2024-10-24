import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../UserContext/UserDataContext'; 
import styles from '../Styles/HomePage.module.css';

function HomePage() {
  const [Auth, SetAuth] = useState(false);
  const { UpdateUserData } = useContext(UserDataContext); 
  const [Data, SetData] = useState({});
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
         
        }
         else {
          SetAuth(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    FetchAuth();
  }, [UpdateUserData]);

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
  const toprofile = function()
  {
    navigate("/profile")
  }

  return (
    <div className={styles.outer}>
      <button onClick={toprofile}>Profile</button>
      {Auth ? (
        <div className="homecontainer">
          <header className="home-header">
            <h1>Welcome to Traveler</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </header>
          <main className="home-main">
            <p>We are glad to have you here. Explore our services and offerings.</p>
          </main>
          <p>{Data.message}</p>
          <p>{Data.userid}</p>
          <p>{Data.section}</p>
        </div>
      ) : (
        <div className="not-authorized-container">
          <h1>You Are Not Authorized to the Home Page</h1>
          <p className="no-way-home">NO WAY HOME</p>
          <Link to="/login" className="login-link">Login</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
