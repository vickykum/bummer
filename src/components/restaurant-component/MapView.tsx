import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './MapView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe, faUtensils, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Restaurant } from '../../models/RestaurantModels';

// Import the images for the marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { extractDomain } from '../../utils/UrlUtils';

// Define the default icon
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
    restaurants: Restaurant[];
}

const MapView: React.FC<MapViewProps> = ({ restaurants }) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
    const [center, setCenter] = useState<L.LatLngExpression>([36.7637, 84.3951]);

    useEffect(() => {
        if (restaurants.length > 0) {
            setSelectedRestaurant(restaurants[0]);
            setCenter([restaurants[0].lat, restaurants[0].lon]);
        }
    }, [restaurants]);

    return (
        <div className="map-container">
            <h2>List View</h2>
            {restaurants.length > 0 ? (
                <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <ChangeView center={center} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {restaurants.map((restaurant, index) => (
                        <Marker
                            key={index}
                            position={[restaurant.lat, restaurant.lon]}
                            icon={new L.Icon({
                                iconUrl: restaurant.website ? ('https://logo.clearbit.com/' + extractDomain(restaurant.website)) : markerIcon,
                                shadowUrl: markerShadow,
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                            })}
                            eventHandlers={{
                                click: () => {
                                    setSelectedRestaurant(restaurant);
                                    setCenter([restaurant.lat, restaurant.lon]);
                                },
                            }}
                        >
                            <Popup>
                                <div className="popup-content">
                                    {restaurant.name && (
                                        <h1>
                                            {restaurant.website ? (
                                                <img src={'https://logo.clearbit.com/' + extractDomain(restaurant.website)} alt="Restaurant Icon" className="restaurant-icon" />
                                            ) : (
                                                <FontAwesomeIcon icon={faUtensils} />
                                            )}{' '}
                                            {restaurant.name}
                                        </h1>
                                    )}                                    {restaurant.address && <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {restaurant.address}</p>}
                                    {restaurant.serviceType && <p><FontAwesomeIcon icon={faUtensils} /> {restaurant.serviceType}</p>}
                                    {restaurant.website && (
                                        <p>
                                            <FontAwesomeIcon icon={faGlobe} />{' '}
                                            <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                                                {restaurant.website}
                                            </a>
                                        </p>
                                    )}
                                    {restaurant.phone && <p><FontAwesomeIcon icon={faPhone} /> {restaurant.phone}</p>}
                                    {restaurant.takeaway && <p><FontAwesomeIcon icon={faUtensils} /> To-Go/Takeaway: {restaurant.takeaway}</p>}
                                    {restaurant.hours && <p><FontAwesomeIcon icon={faClock} /> Hours: {restaurant.hours}</p>}
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            ) : (
                <p className="error-message">No valid address found.</p>
            )}
        </div>
    );
};

interface ChangeViewProps {
    center: L.LatLngExpression;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
};

export default MapView;
