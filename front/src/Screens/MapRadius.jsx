import { 
  Box, 
  Button,
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

function MapRadius() {
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
  const [radius, setRadius] = useState(1); // Default radius in kilometers (1 km)

  const destinationRef = useRef();

  const fetchFamousPlaces = useCallback(async (lat, lng, radius) => {
    if (!window.google) return; 

    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: radius * 1000, // Convert kilometers to meters
      type: ['tourist_attraction'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setFamousPlaces(results);
        
      } else {
        console.error('Error fetching famous places:', status);
      }
    });
  }, [map]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          fetchFamousPlaces(latitude, longitude, radius); // Fetch places with the default radius
        },
        () => {
          console.error("Geolocation access denied or not available.");
        }
      );
    }
  }, [fetchFamousPlaces, radius]);

  useEffect(() => {
    if (center.lat !== 0 && center.lng !== 0) {
      fetchFamousPlaces(center.lat, center.lng, radius); // Fetch places whenever the radius changes
    }
  }, [fetchFamousPlaces, center, radius]);

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
  }

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
          {/* User's location marker with a green color */}
          <Marker
            position={center}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green marker icon
              scaledSize: new window.google.maps.Size(30, 30), // Scale size of the marker
            }}
          />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {/* Render famous places as markers */}
          {famousPlaces.map((place) => (
            <Marker
              key={place.place_id}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
              title={place.name}
              onClick={() => {
                destinationRef.current.value = place.name; // Set the destination to the place name
                calculateRoute(); // Calculate the route to this place
              }}
            />
          ))}
          {/* Draw a circle around the user's location based on the input radius */}
          <Circle
            center={center}
            radius={radius * 1000} // Convert kilometers to meters
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
            max={50} // Set a maximum radius if needed
          />
          <HStack spacing={2}>
            <Button colorScheme='pink' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='clear route'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </HStack>
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
      </Box>
    </Flex> 
  );  
}  

export default MapRadius; 
