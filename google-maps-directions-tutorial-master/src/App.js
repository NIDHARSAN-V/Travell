import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  Circle,
} from '@react-google-maps/api';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import axios from 'axios';

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA4fnb5WG1XByxadWObBtvp8cz-ENaVHgc", // Replace with your API key
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [famousPlaces, setFamousPlaces] = useState([]);
  const [radius, setRadius] = useState(1);
  
  // New state for hovered place details
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [travel_advice , setTravelAdvice] = useState("");

  const destinationRef = useRef();

  const fetchFamousPlaces = useCallback(async (lat, lng, radius) => {
    if (!window.google) return;

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: radius * 1000,
      type: ['tourist_attraction'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setFamousPlaces(results);
      } else {
        console.error('Error fetching famous places:', status);
      }
      console.log('Famous Places:');
      results.forEach(place => {
        console.log(`Name: ${place.name}`);
        console.log(`Rating: ${place.rating} (${place.user_ratings_total} ratings)`);
        console.log(`Status: ${place.business_status}`);
        console.log(`Vicinity: ${place.vicinity}`);
        console.log(`Location: (${place.geometry.location.lat()}, ${place.geometry.location.lng()})`);
        console.log(`Open Now: ${place.opening_hours?.open_now ? 'Yes' : 'No'}`);
        if (place.photos && place.photos.length > 0) {
          console.log(`Photo URL: ${place.photos[0].html_attributions[0]}`);
        }
        console.log('--------------------------------');
      });
    });
  }, [map]);

  useEffect(() => {
    if (map && center.lat !== 0 && center.lng !== 0) {
      map.data.loadGeoJson('/india.geojson'); // Load GeoJSON with district borders
  
      map.data.setStyle((feature) => {
        const geometry = feature.getGeometry();
        if (geometry.getType() === 'Polygon' || geometry.getType() === 'MultiPolygon') {
          return {
            fillColor: '#90EE90',  // Light green color
            fillOpacity: 0.05,
            strokeColor: '#000000',
            strokeWeight: 2,
          };
        }
        return {
          fillColor: '#FFFFFF',
          fillOpacity: 0.1,
          strokeColor: '#000000',
          strokeWeight: 1,
        };
      });
    }
  }, [map, center, radius]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          fetchFamousPlaces(latitude, longitude, radius);
        },
        () => {
          console.error("Geolocation access denied or not available.");
        }
      );
    }
  }, [fetchFamousPlaces, radius]);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (center.lat === 0 || center.lng === 0 || destinationRef.current.value === '') {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: new window.google.maps.LatLng(center.lat, center.lng),
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      if (results && results.routes && results.routes.length > 0) {
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
      } else {
        console.error('No routes found');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    destinationRef.current.value = '';
    setHoveredPlace(null); 
  }


  const handleSearch = async (place) => { 
    try { 
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH :  " , place.name)
      const response = await axios.post(
        'https://scrape.serper.dev/', 
        { 
          url: `https://www.timeanddate.com/weather/india/erode/`,
        },
        {
          headers: {
             'X-API-KEY': 'bcfca4c91744792eafc730ddacf277909e7655cc',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("waether infooooooooooooooooooooooooooooooooooooooooooooo")
      const weatherInfo = parseWeatherData(response.data.text);
      // setWeatherData(weatherInfo); 
      // setError('');
      console.log(weatherInfo)
      // Send weather data to the Express API
      const travelResponse = await axios.post('http://localhost:8001/features/weather_info', { weatherData: weatherInfo });
      console.log(travelResponse.data)
      setTravelAdvice(travelResponse.data); 
    } catch (err) {
      // setError('Failed to fetch weather data. Please try again.');
      console.log(err)
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
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker
            position={center}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", 
              scaledSize: new window.google.maps.Size(30, 30), 
            }}
          />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {famousPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              title={place.name}
              onClick={() => {
                destinationRef.current.value = place.name;
                calculateRoute();
              }}
              onMouseOver={
                
                () => {
                  setHoveredPlace(place)
                  handleSearch(place)
                }

              }
              onMouseOut={
                () => setHoveredPlace(null)
              } // Clear hovered place on mouse out
            />
          ))}
          <Circle
            center={center}
            radius={radius * 1000}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.15,
            }}
          />
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Text flexGrow={1}>Origin: {`${center.lat}, ${center.lng}`}</Text>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>
          <Input
            type='number'
            placeholder='Radius (kms)'
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            min={0}
            max={50}
          />
          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='clear route'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance}</Text>
          <Text>Duration: {duration}</Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          />
        </HStack>
        {hoveredPlace && ( // Display hovered place details
          <Box 
          mt={4} 
          p={4} 
          border='1px' 
          borderColor='gray.200' 
          borderRadius='md' 
          sx={{ zIndex: -100 }} // Set z-index to -100
        >
            <Text fontWeight='bold'>{hoveredPlace.name}</Text>
            <Text>Rating: {hoveredPlace.rating} ({hoveredPlace.user_ratings_total} ratings)</Text>
            <Text>Vicinity: {hoveredPlace.vicinity}</Text>
            <Text>Open Now: {hoveredPlace.opening_hours?.open_now ? 'Yes' : 'No'}</Text>
        
            <Text> 
              <h1>Travel Advice:</h1> 
              <br /> 
              <br />
              <br />
              <h3>{travel_advice}</h3>
            </Text> 
        </Box>
        
        )}
      </Box>
    </Flex>
  );
}

export default App;
