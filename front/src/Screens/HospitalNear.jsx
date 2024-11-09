import React, { useState } from 'react';
import axios from 'axios';

function HospitalNear() {
  const [place, setPlace] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setHospitals([]);

    try {
      const response = await axios.post('http://127.0.0.1:8088/get_hospitals', { place });
      setHospitals(response.data.hospitals);
    } catch (err) {
      setError('An error occurred while fetching hospitals.');
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      marginBottom: '20px',
    },
    label: {
      fontSize: '1rem',
      color: '#333',
      marginRight: '10px',
    },
    input: {
      padding: '10px',
      fontSize: '1rem',
      marginRight: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      width: '200px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1rem',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      borderRadius: '5px',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    loading: {
      fontSize: '1.2rem',
      color: '#007bff',
    },
    error: {
      fontSize: '1.2rem',
      color: 'red',
    },
    list: {
      listStyle: 'none',
      padding: '0',
    },
    listItem: {
      backgroundColor: '#f9f9f9',
      margin: '10px 0',
      padding: '15px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    strong: {
      fontWeight: 'bold',
    },
    rating: {
      color: '#ff9800',
    },
    address: {
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Find Nearby Hospitals</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="place" style={styles.label}>Enter a place:</label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>
      
      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      
      <ul style={styles.list}>
        {hospitals.map((hospital, index) => (
          <li key={index} style={styles.listItem}>
            <strong style={styles.strong}>Name:</strong> {hospital.name} <br />
            <strong style={styles.strong}>Rating:</strong> <span style={styles.rating}>{hospital.rating}</span> <br />
            <strong style={styles.strong}>Persons Rated:</strong> <span style={styles.address}>{hospital.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HospitalNear;
