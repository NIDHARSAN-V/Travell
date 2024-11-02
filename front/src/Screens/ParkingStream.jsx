import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const ParkingStream = () => {
  const [slotNumber, setSlotNumber] = useState('');
  const [highlighted, setHighlighted] = useState(false);

  
  const handleSlotChange = (e) => {
    setSlotNumber(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:5000/highlight_slot', { slot_number: parseInt(slotNumber) })
      .then((response) => {
        console.log('Slot highlighted:', response.data);
        setHighlighted(true);
      })
      .catch((error) => {
        console.error('Error highlighting slot:', error);
      });
  };

 

  async function onToken(token) {
    try {
      const response = await axios.post('/save-stripe-token', token);
      const data = response.data;
      console.log(data);
      
     
      const res = await axios.post('http://localhost:8001/save_payment_traveler');
      
      alert(`Payment Successful! We are in business, ${data.email}`);
    } catch (error) {
      console.error('Payment error:', error);
    }
  }
  

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Video Stream with Slot Highlighting and Payment</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="slot_number">Enter Slot Number (1 to N):</label>
        <input
          type="number"
          id="slot_number"
          name="slot_number"
          value={slotNumber}
          onChange={handleSlotChange}
          min="1"
          style={{
            margin: '10px',
            padding: '10px',
            fontSize: '16px',
            width: '100px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginRight: '10px',
          }}
        >
          Highlight Slot
        </button>
      </form>

      {/* Stripe Checkout Button */}
      {highlighted && (
        <div>
          <h2>Proceed to Payment</h2>
          <StripeCheckout
            token={onToken}
            stripeKey="pk_test_51PA5GUSFzceLDgj2NACSZD0YI1rAf08ccP9agXruaiuKq4Vk9emgNVLxGTlmDktD8rqGdwFJJgATj1xFiWxp5Fgx00AvUH8Ago" // Replace with your actual publishable key
            name="Parking Slot Payment"
            amount={500} // Amount in cents ($5.00)
          />
        </div>
      )}

      <h2>Live Video Feed</h2>
      <img
        src="http://127.0.0.1:5000/video_feed"
        alt="Live Video Feed"
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      />
    </div>
  );
};

export default ParkingStream;
