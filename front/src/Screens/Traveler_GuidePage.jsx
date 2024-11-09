import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../UserContext/UserDataContext';

function Traveler_GuidePage() {
  const [guides, setGuides] = useState([]);
  const { UserId } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [locationFilter, setLocationFilter] = useState(''); 
  const [bookingDate, setBookingDate] = useState(''); // State for booking date
  const [bookingMessage, setBookingMessage] = useState(''); // State for booking feedback message
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of guides from the backend
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8001/traveler/guide_list');
        setGuides(response.data);
      } catch (error) {
        setError('Failed to load guides');
        console.error("Error fetching guides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // Handle guide booking
  const handleBooking = async (guideId) => {
    if (!bookingDate) {
      setBookingMessage('Please select a booking date');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8001/traveler/book_guide', {
        guideId,
        userId: UserId,
        date: bookingDate
    }, {
        withCredentials: true
    });
    
      setBookingMessage(`Booking successful for ${response.data.guideName}`);
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingMessage('Booking failed. Please try again.');
    }
  };

  // Handle guide verification navigation
  const handleVerifyGuide = (guideId) => {
    navigate(`/guide_verify`);
  };

  if (loading) {
    return <div>Loading guides...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredGuides = guides.filter(guide =>
    guide.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div>
      <h1>{UserId}</h1>
      <h1>Available Guides</h1>
      <input
        type="text"
        placeholder="Filter by location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
      />
      <input
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
      />

      <div>
        {filteredGuides.length > 0 ? (
          filteredGuides.map((guide) => (
            <div key={guide._id} className="guide-card">
              <h2>{guide.name}</h2>
              <p>Email: {guide.email}</p>
              <p>Phone: {guide.phone}</p>
              <p>Location: {guide.location}</p>
              <p>Ratings: {guide.ratings}</p>
              <p>Reviews: {guide.reviews && guide.reviews.length}</p>
              <button onClick={() => handleBooking(guide._id)}>Book Guide</button>
              <button onClick={() => handleVerifyGuide(guide._id)}>Verify Guide</button> {/* New Verify Guide button */}
            </div>
          ))
        ) : (
          <p>No guides available for this location</p>
        )}
      </div>

      {/* Display booking feedback message */}
      {bookingMessage && <p>{bookingMessage}</p>}
    </div>
  );
}

export default Traveler_GuidePage;
