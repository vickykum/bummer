import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './MapView.css';

// Import the images for the marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Define the default icon
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Define the blue icon
const BlueIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  restaurants: { name: string; address: string; lat: number; lon: number, url: string }[];
}

const MapView: React.FC<MapViewProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  useEffect(() => {
    if (restaurants.length > 0) {
      setSelectedRestaurant(restaurants[0].name);
    }
  }, [restaurants]);

  return (
    <div className="map-container">
      {restaurants ? (
        <MapContainer center={[restaurants[0].lat, restaurants[0].lon]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              position={[restaurant.lat, restaurant.lon]}
              icon={new L.Icon({
                iconUrl: restaurant.url? ('https://logo.clearbit.com/'+restaurant.url): markerIcon,
                shadowUrl: markerShadow,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })}
              eventHandlers={{
                click: () => {
                  setSelectedRestaurant(restaurant.name);
                },
              }}
            >
              <Popup>{restaurant.name}<br />{restaurant.address}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>No valid address found.</p>
      )}
    </div>
  );
};

export default MapView;
