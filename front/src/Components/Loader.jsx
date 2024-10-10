import React, { useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';

function Loader({ color = '#36d7b7', size = 80, isLoading = true }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <RingLoader color={color} loading={isLoading} size={size} />
    </div>
  );
}

export default Loader;
