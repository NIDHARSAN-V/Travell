// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const LocationAccess = ({ onLocationAccessed }) => {
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null,
//     address: null,
//   });
//   const [error, setError] = useState(null);
//   const [distance, setDistance] = useState(null);

//   const REACT_LOCATION = {
//     latitude: 37.422,
//     longitude: -122.084,
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation({ latitude, longitude });

//           // Get the address from latitude and longitude
//           const address = await getAddress(latitude, longitude);
//           setLocation((prev) => ({ ...prev, address }));

//           // Calculate distance to React location
//           const distance = calculateDistance(
//             latitude,
//             longitude,
//             REACT_LOCATION.latitude,
//             REACT_LOCATION.longitude
//           );
//           setDistance(distance);

//           onLocationAccessed(); // Notify that location access is successful
//         },
//         (err) => {
//           setError(err.message);
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by this browser.");
//     }
//   };

//   const getAddress = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc`
//       );
//       return response.data.results[0]?.formatted_address || "Unknown location";
//     } catch (error) {
//       console.error("Error fetching address:", error);
//       return "Unable to fetch address";
//     }
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const toRadians = (degree) => degree * (Math.PI / 180);
//     const R = 6371;
//     const dLat = toRadians(lat2 - lat1);
//     const dLon = toRadians(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   return (
//     <div style={{ marginBottom: "20px" }}>
//       <h2>Get Location Access</h2>
//       <button onClick={getLocation}>Get My Location</button>
//       {location.latitude && location.longitude ? (
//         <div>
//           <p>Latitude: {location.latitude}</p>
//           <p>Longitude: {location.longitude}</p>
//           <p>Address: {location.address}</p>
//           {distance && <p>Distance to React: {distance.toFixed(2)} km</p>}
//           <Map userLocation={location} reactLocation={REACT_LOCATION} />
//         </div>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <p>Click the button to get your location.</p>
//       )}
//     </div>
//   );
// };

// const Map = ({ userLocation, reactLocation }) => {
//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc`;
//       script.async = true;
//       script.defer = true;
//       document.body.appendChild(script);

//       script.onload = () => {
//         initMap();
//       };

//       script.onerror = () => {
//         console.error("Failed to load Google Maps API.");
//       };
//     };

//     const initMap = () => {
//       if (window.google) {
//         const userLatLng = new window.google.maps.LatLng(userLocation.latitude, userLocation.longitude);
//         const reactLatLng = new window.google.maps.LatLng(reactLocation.latitude, reactLocation.longitude);

//         const map = new window.google.maps.Map(document.getElementById("map"), {
//           center: userLatLng,
//           zoom: 14,
//         });

//         new window.google.maps.Marker({
//           position: userLatLng,
//           map: map,
//           title: "Your Location",
//         });

//         new window.google.maps.Marker({
//           position: reactLatLng,
//           map: map,
//           title: "React Location",
//         });

//         const directionsService = new window.google.maps.DirectionsService();
//         const directionsRenderer = new window.google.maps.DirectionsRenderer();
//         directionsRenderer.setMap(map);

//         const request = {
//           origin: userLatLng,
//           destination: reactLatLng,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         };

//         directionsService.route(request, (result, status) => {
//           if (status === "OK") {
//             directionsRenderer.setDirections(result);
//           } else {
//             console.error("Error fetching directions:", status);
//           }
//         });
//       } else {
//         console.error("Google Maps API is not loaded.");
//       }
//     };

//     loadGoogleMapsScript();

//     return () => {
//       const existingScript = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc"]`);
//       if (existingScript) {
//         existingScript.remove();
//       }
//     };
//   }, [userLocation]);

//   return <div id="map" style={{ width: "100%", height: "400px", borderRadius: "8px", marginBottom: "20px" }} />;
// };

// const GuideVerify = () => {
//   const [matchResult, setMatchResult] = useState("");
//   const videoRef = React.useRef(null);
//   const canvasRef = React.useRef(null);

//   const startVideoStream = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.error("Error accessing webcam:", error);
//     }
//   };

//   const captureImage = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     if (canvas && video) {
//       const context = canvas.getContext("2d");
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageData = canvas.toDataURL("image/jpeg");
//       verifyFace(imageData);
//     }
//   };

//   const verifyFace = async (imageData) => {
//     try {
//       const response = await axios.post("http://localhost:5000/verify", {
//         image: imageData,
//       });
//       setMatchResult(response.data.message);
//     } catch (error) {
//       console.error("Error during face verification:", error);
//       setMatchResult("An error occurred while verifying the face.");
//     }
//   };

//   return (
//     <div>
//       <h2>Face Verification</h2>
//       <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto", borderRadius: "8px", marginBottom: "10px" }} />
//       <canvas ref={canvasRef} style={{ display: "none" }} width="400" height="300" />
//       <button onClick={captureImage} style={{ marginRight: "10px" }}>Capture Face</button>
//       <button onClick={startVideoStream}>Start Camera</button>
//       {matchResult && <p>{matchResult}</p>}
//     </div>
//   );
// };

// const GuideVerification = () => {
//   const [locationAccessed, setLocationAccessed] = useState(false);

//   const handleLocationAccessed = () => {
//     setLocationAccessed(true);
//   };

//   return (
//     <div style={{ overflowY: "auto", padding: "20px", maxHeight: "90vh" }}>
//       <h1>Guide Verification</h1>
//       <LocationAccess onLocationAccessed={handleLocationAccessed} />
//       {locationAccessed && <GuideVerify />}
//     </div>
//   );
// };

// export default GuideVerification;










import React, { useState, useEffect } from "react";
import axios from "axios";

const LocationAccess = ({ onLocationAccessed }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: null,
  });
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);

  const REACT_LOCATION = {
    latitude: 37.422,
    longitude: -122.084,
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Get the address from latitude and longitude
          const address = await getAddress(latitude, longitude);
          setLocation((prev) => ({ ...prev, address }));

          // Calculate distance to React location
          const distance = calculateDistance(
            latitude,
            longitude,
            REACT_LOCATION.latitude,
            REACT_LOCATION.longitude
          );
          setDistance(distance);

          onLocationAccessed(); // Notify that location access is successful
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc`
      );
      return response.data.results[0]?.formatted_address || "Unknown location";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unable to fetch address";
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div style={{ marginBottom: "20px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ color: "#333" }}>Get Location Access</h2>
      <button onClick={getLocation} style={{ padding: "10px 15px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Get My Location</button>
      {location.latitude && location.longitude ? (
        <div style={{ marginTop: "15px" }}>
          <p style={{ color: "#555" }}>Latitude: {location.latitude}</p>
          <p style={{ color: "#555" }}>Longitude: {location.longitude}</p>
          <p style={{ color: "#555" }}>Address: {location.address}</p>
          {distance && <p style={{ color: "#555" }}>Distance to React: {distance.toFixed(2)} km</p>}
          <Map userLocation={location} reactLocation={REACT_LOCATION} />
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <p style={{ color: "#555" }}>Click the button to get your location.</p>
      )}
    </div>
  );
};

const Map = ({ userLocation, reactLocation }) => {
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initMap();
      };

      script.onerror = () => {
        console.error("Failed to load Google Maps API.");
      };
    };

    const initMap = () => {
      if (window.google) {
        const userLatLng = new window.google.maps.LatLng(userLocation.latitude, userLocation.longitude);
        const reactLatLng = new window.google.maps.LatLng(reactLocation.latitude, reactLocation.longitude);

        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: userLatLng,
          zoom: 14,
        });

        new window.google.maps.Marker({
          position: userLatLng,
          map: map,
          title: "Your Location",
        });

        new window.google.maps.Marker({
          position: reactLatLng,
          map: map,
          title: "React Location",
        });

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const request = {
          origin: userLatLng,
          destination: reactLatLng,
          travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        });
      } else {
        console.error("Google Maps API is not loaded.");
      }
    };

    loadGoogleMapsScript();

    return () => {
      const existingScript = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [userLocation]);

  return <div id="map" style={{ width: "100%", height: "400px", borderRadius: "8px", marginBottom: "20px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }} />;
};

const GuideVerify = () => {
  const [matchResult, setMatchResult] = useState("");
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const startVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      verifyFace(imageData);
    }
  };

  const verifyFace = async (imageData) => {
    try {
      const response = await axios.post("http://localhost:5000/verify", {
        image: imageData,
      });
      setMatchResult(response.data.message);
    } catch (error) {
      console.error("Error during face verification:", error);
      setMatchResult("An error occurred while verifying the face.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ color: "#333" }}>Face Verification</h2>
      <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto", borderRadius: "8px", marginBottom: "10px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} width="400" height="300" />
      <button onClick={captureImage} style={{ marginRight: "10px", padding: "10px 15px", borderRadius: "5px", backgroundColor: "#28a745", color: "#fff", border: "none", cursor: "pointer" }}>Capture Face</button>
      <button onClick={startVideoStream} style={{ padding: "10px 15px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Start Webcam</button>
      {matchResult && <p style={{ marginTop: "15px", color: matchResult.includes("success") ? "green" : "red" }}>{matchResult}</p>}
    </div>
  );
};

const App = () => {
  const handleLocationAccessed = () => {
    console.log("Location has been accessed successfully.");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <LocationAccess onLocationAccessed={handleLocationAccessed} />
      <GuideVerify />
    </div>
  );
};

export default App;
