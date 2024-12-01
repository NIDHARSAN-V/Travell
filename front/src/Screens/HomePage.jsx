// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { UserDataContext } from '../UserContext/UserDataContext';
// import styles from '../Styles/HomePage.module.css';
// import { UserPlaceContext } from '../UserContext/PlaceContext';

// function HomePage() {
//   const [Auth, SetAuth] = useState(false);
//   const { UpdateUserData } = useContext(UserDataContext);
//   const [Data, SetData] = useState({});
//   const [ProfileComplete, SetProfileComplete] = useState(true);
//   const navigate = useNavigate();
//   const { UpdatePlaceData } = useContext(UserPlaceContext);
//   const [place, setPlace] = useState('');

//   useEffect(() => {
//     const FetchAuth = async function () {
//       try {
//         const res = await axios.get('http://localhost:8001/');
//         if (res.data.success) {
//           SetData(res.data);
//           UpdateUserData(res.data.userid, res.data.section);
//           SetAuth(true);
//         } else {
//           SetAuth(false);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     FetchAuth();
//   }, [UpdateUserData]);

//   useEffect(() => {
//     const CheckProfileCompletion = async function () {
//       if (Data.userid) {
//         try {
//           const res = await axios.get(`http://localhost:8001/profile/${Data.userid}`);
//           if (!res.data.complete) {
//             SetProfileComplete(false);
//             navigate("/profile");
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     };
//     if (Auth) {
//       CheckProfileCompletion();
//     }
//   }, [Auth, Data.userid, navigate]);

//   axios.defaults.withCredentials = true;

//   const handleLogout = async function () {
//     try {
//       const res = await axios.get('http://localhost:8001/logout');
//       if (res) {
//         window.location.reload(true);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const navigateTo = (path) => {
//     navigate(path);
//   };

//   const handleGetStarted = () => {
//     if (place) {
//       UpdatePlaceData(place);
//     } else {
//       alert("Please enter a place to proceed!");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {Auth ? (
//         <div className={styles.homecontainer}>
//           <header className={styles.homeHeader}>
//             <h1 className={styles.welcomeMessage}>Welcome to Traveler</h1>
//             <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
//           </header>
//           <main className={styles.gridContent}>
//             <section className={styles.getStarted}>
//               <h1>Enter the Place:</h1>
//               <input
//                 type="text"
//                 value={place}
//                 onChange={(e) => setPlace(e.target.value)}
//                 placeholder="Enter the place to travel"
//               />
//               <button onClick={handleGetStarted}>Get Started</button>
//             </section>
//             <section className={styles.features}>
           
//               <div className={styles.buttonWrapper}>
//                 <button onClick={() => navigateTo("/profile")}>Profile</button>
//                 <button onClick={() => navigateTo("/guide_list")}>Guide List</button>
//                 <button onClick={() => navigateTo("/ev")}>EV Station</button>
//                 <button onClick={() => navigateTo("/guide_booking_view")}>Guide Booking View</button>
//                 <button onClick={() => navigateTo("/park")}>Parking Stream</button>
//                 <a href="http://localhost:3000/"><button>Location Map</button></a>
//                 <a href="https://plane-it-travel-ai.vercel.app/plan-a-trip"><button>Planner</button></a>
//               </div>
//             </section>
//           </main>
//         </div>
//       ) : (
//         <div className={styles.notAuthorizedContainer}>
//           <h1>You Are Not Authorized to the Home Page</h1>
//           <p className={styles.noWayHome}>NO WAY HOME</p>
//           <Link to="/login" className={styles.loginLink}>Login</Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomePage;



import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { UserDataContext } from '../UserContext/UserDataContext';
import styles from '../Styles/HomePage.module.css';
import { UserPlaceContext } from '../UserContext/PlaceContext';

function HomePage() {
  const [Auth, SetAuth] = useState(false);
  const { UpdateUserData } = useContext(UserDataContext);
  const [Data, SetData] = useState({});
  const [ProfileComplete, SetProfileComplete] = useState(true);
  const navigate = useNavigate();
  const { UpdatePlaceData } = useContext(UserPlaceContext);
  const [place, setPlace] = useState('');

  useEffect(() => {
    const FetchAuth = async function () {
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
          if (!res.data.complete) {
            SetProfileComplete(false);
            navigate("/profile");
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
      UpdatePlaceData(place);
    } else {
      alert("Please enter a place to proceed!");
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {Auth ? (
        <motion.div
          className={styles.homecontainer}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <header className={styles.homeHeader}>
            <motion.h1
              className={styles.welcomeMessage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Welcome to Traveler
            </motion.h1>
            <motion.button
              className={styles.logoutButton}
              onClick={handleLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Logout
            </motion.button>
          </header>

          <main className={styles.gridContent}>
            <motion.section
              className={styles.getStarted}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Enter the Place:</h1>
              <motion.input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="Enter the place to travel"
                whileFocus={{ borderColor: "#6c63ff", scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.1, backgroundColor: "#6c63ff", color: "#fff" }}
                whileTap={{ scale: 0.9 }}
              >
                Get Started
              </motion.button>
            </motion.section>

            <motion.section
              className={styles.features}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.buttonWrapper}>
                {[
                  { label: "Profile", path: "/profile" },
                  { label: "Guide List", path: "/guide_list" },
                  { label: "EV Station", path: "/ev" },
                  { label: "Guide Booking View", path: "/guide_booking_view" },
                  { label: "Parking Stream", path: "/park" },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => navigateTo(item.path)}
                    whileHover={{ scale: 1.1, backgroundColor: "#6c63ff", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <a href="http://localhost:3000/">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#6c63ff", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Location Map
                  </motion.button>
                </a>
                <a href="https://plane-it-travel-ai.vercel.app/plan-a-trip">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#6c63ff", color: "#fff" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Planner
                  </motion.button>
                </a>
              </div>
            </motion.section>
          </main>
        </motion.div>
      ) : (
        <motion.div
          className={styles.notAuthorizedContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1>You Are Not Authorized to the Home Page</h1>
          <p className={styles.noWayHome}>NO WAY HOME</p>
          <Link to="/login" className={styles.loginLink}>
            Login
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

export default HomePage;
