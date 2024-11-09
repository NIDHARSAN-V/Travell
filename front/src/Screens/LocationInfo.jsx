import React, { useState } from 'react';
import axios from 'axios';

const LocationInfo = () => {
  const [place, setPlace] = useState('');
  const [weatherData, setWeatherData] = useState(null); 
  const [travelAdvice, setTravelAdvice] = useState(''); 
  const [error, setError] = useState(''); 

  const handleInputChange = (event) => { 
    setPlace(event.target.value); 
  }; 

  const handleSearch = async () => { 
    try { 
      const response = await axios.post(
        'https://scrape.serper.dev/', 
        { 
          url: `https://www.timeanddate.com/weather/india/${place.toLowerCase()}`,
        },
        {
          headers: {
             'X-API-KEY': 'bcfca4c91744792eafc730ddacf277909e7655cc',
            'Content-Type': 'application/json',
          },
        }
      );

      const weatherInfo = parseWeatherData(response.data.text);
      setWeatherData(weatherInfo); 
      setError('');

      // Send weather data to the Express API
      const travelResponse = await axios.post('http://localhost:8001/features/weather_info', { weatherData: weatherInfo });
      console.log(travelResponse.data)
      setTravelAdvice(travelResponse.data); 
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const parseWeatherData = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');

    const weatherInfo = {
      title: lines[0],
      currentTemp: lines[1].replace('Now', '').trim(),
      condition: lines[2],
      feelsLike: '',
      forecast: '',
      wind: '',
      location: '',
      time: '',
      reportTime: '',
      visibility: '',
      pressure: '',
      humidity: '',
      dewPoint: '',
      nearbyStations: [],
    };

    lines.forEach((line, index) => {
      if (line.startsWith('Feels Like:')) {
        weatherInfo.feelsLike = line.replace('Feels Like:', '').trim();
      } else if (line.startsWith('Forecast:')) {
        weatherInfo.forecast = line.replace('Forecast:', '').trim();
      } else if (line.startsWith('Wind:')) {
        weatherInfo.wind = line.replace('Wind:', '').trim();
      } else if (line.startsWith('Location:')) {
        weatherInfo.location = line.replace('Location:', '').trim();
      } else if (line.startsWith('Current Time:')) {
        weatherInfo.time = line.replace('Current Time:', '').trim();
      } else if (line.startsWith('Latest Report:')) {
        weatherInfo.reportTime = line.replace('Latest Report:', '').trim();
      } else if (line.startsWith('Visibility:')) {
        weatherInfo.visibility = line.replace('Visibility:', '').trim();
      } else if (line.startsWith('Pressure:')) {
        weatherInfo.pressure = line.replace('Pressure:', '').trim();
      } else if (line.startsWith('Humidity:')) {
        weatherInfo.humidity = line.replace('Humidity:', '').trim();
      } else if (line.startsWith('Dew Point:')) {
        weatherInfo.dewPoint = line.replace('Dew Point:', '').trim();
      } else if (line.includes('Currently at nearby stations')) {
        weatherInfo.nearbyStations = lines.slice(index + 1);
      }
    });

    return weatherInfo;
  };

  return (
    <div style={styles.container}>
      <h1>Location Info</h1>
      <input 
        type="text" 
        placeholder="Enter place" 
        value={place}
        onChange={handleInputChange}
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Check Weather</button>
      {error && <p style={styles.error}>{error}</p>}

      {travelAdvice && (
        <div style={styles.travelAdvice}>
          <h3>Travel Advice:</h3>
          <h3>
          
          <pre>
            {travelAdvice}
          </pre>
          </h3>
          
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  weatherInfo: {
    marginTop: '20px',
    textAlign: 'center',
  },
  travelAdvice: {
    marginTop: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red', 
  }, 
}; 

export default LocationInfo;
