import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GuideBookingView() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      // Fetch the booking data with the traveler details
      const res = await axios.get("http://localhost:8001/guide/payment_list", { 
        withCredentials: true, // Ensures cookies are sent with the request  
      });
      setBookings(res.data.bookings); // Set the enriched bookings data
      console.log(res.data.bookings); // Log the bookings to inspect the structure
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings(); 
  }, []); 

  return (
    <div>
      <h2>Guide Bookings</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {bookings.length > 0 ? (
          bookings.map((item, index) => (
            <li 
              key={index} 
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                margin: "10px 0",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              
              <div>
                <strong>Traveler Details:</strong>
                <p>Name: {item.traveler.name}</p>
                <p>Email: {item.traveler.email}</p>
                <p>Phone: {item.traveler.phone}</p>
                <p>Location: {item.traveler.location}</p>
              </div>
              
              {/* Display booking details */}
              <div>
                <strong>Booking Details:</strong>
                <p>Booking ID: {item.booking._id}</p>
                <p>Date: {item.booking.date}</p>
                {/* Add more fields from the booking object as needed */}
              </div>
            </li>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </ul>
    </div>
  );
}

export default GuideBookingView;
