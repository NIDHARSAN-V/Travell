import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavScrollExample from '../components/Navbar';
// import '../styles/Homestyle.css';

function HomeScreen() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [userid, setUserId] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5432/');
        console.log(res.data.success);

        if (res.data.success) {
          setAuth(true);
          setSuccess(true);
          setUserId(res.data.userid);
          console.log(res.data.token);
        } else {
          setAuth(false);
          setSuccess(false);
          setMessage(res.data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Handle logout
  const handleLogout = async function () {
    try {
      const res = await axios.get('http://localhost:5432/logout');
      if (res) {
        window.location.reload(true); // Reloads the page after logout
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavScrollExample />
      <div className="cont">
        {auth ? (
          <div className="home-container">
            <header className="home-header">
              <h1>Welcome to CCZ</h1>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </header>
            <main className="home-main">
              <p>We are glad to have you here. Explore our services and offerings.</p>
            </main>
          </div>
        ) : (
          <div className="not-authorized-container">
            <h1>You Are Not Authorized to the Home Page</h1>
            <p className="no-way-home">NO WAY HOME</p>
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default HomeScreen;
