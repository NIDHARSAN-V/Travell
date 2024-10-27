import React, { useState, useRef } from 'react';
import axios from 'axios';

function GuideVerify() {
  const [matchResult, setMatchResult] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);


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
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      verifyFace(imageData); 
    }
  };

  
  const verifyFace = async (imageData) => {
    try {
      const response = await axios.post('http://localhost:5000/verify', {
        image: imageData
      });
      setMatchResult(response.data.message);
    } catch (error) {
      console.error("Error during face verification:", error);
      setMatchResult("An error occurred while verifying the face.");
    }
  };

  return (
    <div>
      <h1>Face Verification</h1>
      <video ref={videoRef} autoPlay style={{ width: '400px', height: '300px', borderRadius: '8px' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="300" />
      <button onClick={captureImage}>Capture Face</button>
      <button onClick={startVideoStream}>Start Camera</button>
      {matchResult && <p>{matchResult}</p>}
    </div>
  );
}

export default GuideVerify;
