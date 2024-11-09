import React from 'react';

function Services() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#333', marginBottom: '1rem' }}>Our Services</h1>
     
      <h2 style={{ fontSize: '1.8rem', color: '#555', textAlign: 'center', marginBottom: '1.5rem' }}>
        Providing Essential Travel Services for a Secure and Informed Journey
      </h2>

      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <li style={{ marginBottom: '2rem', animation: 'fadeIn 0.6s ease-in-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem', color: '#e74c3c', marginRight: '10px', animation: 'pulse 1.5s infinite' }}>🔔</span>
            <strong style={{ fontSize: '1.2rem', color: '#333' }}>Real-time Disaster and Disease Alerts</strong>
          </div>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
            Stay updated with alerts on natural disasters, disease outbreaks, and other emergency situations. Receive real-time notifications sourced from trusted organizations, helping you make safe travel decisions.
          </p>
        </li>

        <li style={{ marginBottom: '2rem', animation: 'fadeIn 0.8s ease-in-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem', color: '#3498db', marginRight: '10px', animation: 'fade-in 1.5s infinite' }}>🌦️</span>
            <strong style={{ fontSize: '1.2rem', color: '#333' }}>Weather Updates and Forecast</strong>
          </div>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
            Plan with confidence using accurate, real-time weather forecasts. Stay ahead of any severe weather conditions with up-to-date information tailored for your current location.
          </p>
        </li>

        <li style={{ marginBottom: '2rem', animation: 'fadeIn 1s ease-in-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem', color: '#2ecc71', marginRight: '10px', animation: 'pin-drop 1.5s ease-in-out' }}>🅿️</span>
            <strong style={{ fontSize: '1.2rem', color: '#333' }}>Smart Parking Solutions</strong>
          </div>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
            Easily locate, reserve, and pay for parking spaces in real-time, making city parking stress-free and efficient. Say goodbye to endless searches for parking!
          </p>
        </li>

        <li style={{ marginBottom: '2rem', animation: 'fadeIn 1.2s ease-in-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem', color: '#f39c12', marginRight: '10px', animation: 'zoomIn 1.5s infinite' }}>⚡</span>
            <strong style={{ fontSize: '1.2rem', color: '#333' }}>Nearby EV Charging Stations</strong>
          </div>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
            Locate nearby EV charging stations with comprehensive details on availability and distance, ensuring your EV stays charged throughout your journey.
          </p>
        </li>

        <li style={{ marginBottom: '2rem', animation: 'fadeIn 1.4s ease-in-out' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem', color: '#9b59b6', marginRight: '10px', animation: 'flipCard 0.5s' }}>🧭</span>
            <strong style={{ fontSize: '1.2rem', color: '#333' }}>Personalized Itinerary Suggestions</strong>
          </div>
          <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
            Get curated itineraries based on your preferences and current events, from popular attractions to hidden gems, for a personalized travel experience.
          </p>
        </li>
      </ul>
     
      <p style={{ fontSize: '1rem', color: '#666', textAlign: 'center', marginTop: '1.5rem', lineHeight: '1.6' }}>
        Discover all you need for an extraordinary trip with our Travel Planner, making each journey safer, smarter, and more memorable.
      </p>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes pin-drop {
          0% { transform: scale(0.8) translateY(-20px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes zoomIn {
          0% { transform: scale(0.8); }
          100% { transform: scale(1); }
        }
        @keyframes flipCard {
          0% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
      `}</style>
    </div>
  );
}

export default Services;