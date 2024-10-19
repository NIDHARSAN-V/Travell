import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Styles/HomePage.module.css'


function HomePage() {


  const [Auth, SetAuth] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {

    const FetchAuth = async function () {
      try {
        const res = await axios.get("http://localhost:5432/")
        console.log(res.data.success)
        if (res.data.success) {

        }
        else {

        }
      }
      catch (error) {
        console.log(error)
      }
    }

    FetchAuth();
  }, [])


  axios.defaults.withCredentials = true
  const handleLogout = async function () {
    try {
      const res = axios.get("http://localhost:5432/logout")
      if (res) {
        window.location.reload(true)
      }
      else {

      }
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <div className={styles.outer}>

      {Auth ? (
        <div className="homecontainer">
          <header className="home-header">
            <h1>Welcome to CCZ</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
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
  )
}

export default HomePage
