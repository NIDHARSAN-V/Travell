import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const ParkingStream = () => {
  const [slotNumber, setSlotNumber] = useState('');
  const [highlighted, setHighlighted] = useState(false);

  // Simulate video feed initialization
  useEffect(() => {
    axios
      .post("http://localhost:8001/")
      .then((response) => {
        console.log('Backend initialized:', response.data);
      })
      .catch((error) => {
        console.error('Error initializing backend:', error);
      });
  }, []);
  

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

  const onToken = async (token) => {
    try {
      console.log('Parking Token:', token);

      const paymentData = { id: token.id, card: token.card };

      const res = await axios.post(
        "http://localhost:8001/parking/payment_add",
        { payment_data: paymentData },
        { withCredentials: true }
      );

      console.log(res.data);

      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

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

      {highlighted && (
        <div>
          <h2>Proceed to Payment</h2>
          <StripeCheckout
            token={onToken}
            stripeKey="pk_test_51PA5GUSFzceLDgj2NACSZD0YI1rAf08ccP9agXruaiuKq4Vk9emgNVLxGTlmDktD8rqGdwFJJgATj1xFiWxp5Fgx00AvUH8Ago"
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
          maxWidth: '70%',
          height: '50vh',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginTop: '20px',
        }}
      />
    </div>
  );
};

export default ParkingStream;
