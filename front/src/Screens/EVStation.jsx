import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Leaflet marker icon fix 
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({ 
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const App = () => {
    const [stations, setStations] = useState([]);
    const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.2090 });
 
    useEffect(() => { 
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                fetchEVStations(latitude, longitude);
            },
            () => alert("Geolocation permission denied or unavailable.")
        );
    }, []);

    const fetchEVStations = async (latitude, longitude) => {
        try { 
            const response = await axios.post('http://localhost:8001/features/ev', { latitude, longitude }); 
            setStations(response.data); 
        } catch (error) {
            console.error("Error fetching EV stations:", error);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <MapContainer center={userLocation} zoom={12} style={{ width: '70%', height: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19} 
                /> 
                {stations.map(station => ( 
                    <Marker key={station.id} position={[station.latitude, station.longitude]}>
                        <Popup>
                            <strong>{station.title}</strong><br />
                            {station.address}, {station.town || ''}, {station.state}, {station.postcode || ''}<br />
                            Distance: {station.distance} {station.distanceUnit}<br />
                            Status: {station.status}<br />
                            Last Verified: {new Date(station.lastVerified).toLocaleString()}
                        </Popup>
                    </Marker>
                ))} 
            </MapContainer> 
 
            <div style={{ width: '30%', padding: '20px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
                <h2>Nearby EV Charging Stations</h2>
                <div>
                    {stations.map(station => (
                        <div key={station.id} style={{ padding: '10px', marginBottom: '15px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '5px' }}>
                            <h3 style={{ fontSize: '18px', color: '#007BFF' }}>{station.title}</h3>
                            <p>{station.address}, {station.town || ''}, {station.state}, {station.postcode || ''}</p>
                            <p>Distance: {station.distance} {station.distanceUnit}</p>
                            <p>Status: {station.status}</p>
                            <p>Last Verified: {new Date(station.lastVerified).toLocaleString()}</p> 
                        </div> 
                    ))} 
                </div> 
            </div> 
        </div> 
    ); 
}; 

export default App;
