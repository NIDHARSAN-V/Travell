import React, { useEffect, useState } from "react";
import axios from "axios";

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
    fetchBookings(); // Fetch bookings on mount
  }, []); // Empty dependency array to run only once on mount

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Guide Bookings
      </h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {bookings.length > 0 ? (
          bookings.map((item, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                margin: "10px 0",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 2px 4px rgba(0, 0, 0, 0.1)")
              }
            >
              {/* Display traveler details */}
              <div>
                <strong style={{ fontSize: "14px", color: "#555" }}>
                  Traveler Details:
                </strong>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#333" }}>
                  <strong>Name:</strong> {item.traveler.name}
                </p>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#333" }}>
                  <strong>Email:</strong> {item.traveler.email}
                </p>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#333" }}>
                  <strong>Phone:</strong> {item.traveler.phone}
                </p>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#333" }}>
                  <strong>Location:</strong> {item.traveler.location}
                </p>
              </div>

              {/* Display booking details */}
              <div>
                <strong style={{ fontSize: "14px", color: "#555" }}>
                  Booking Details:
                </strong>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#333" }}>
                  <strong>Booking ID:</strong> {item.booking._id}
                </p>
                <p style={{ margin: "4px 0", fontSize: "13px", color: "#333" }}>
                  <strong>Date:</strong> {item.booking.date}
                </p>
                {/* Add more fields from the booking object as needed */}
              </div>
            </li>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            No bookings available.
          </p>
        )}
      </ul>
    </div>
  );
}

export default GuideBookingView;
