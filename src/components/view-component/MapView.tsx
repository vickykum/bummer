import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './MapView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe, faUtensils, faClock, faMapMarkerAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Restaurant } from '../../models/RestaurantModels';

// Import the images for the marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { extractDomain } from '../../utils/UrlUtils';
import { addressToString } from '../../utils/StringUtils';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const handleRestaurantClick = (restaurant: Restaurant) => {
        navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } });
    };

    useEffect(() => {
        if (restaurants.length > 0) {
            setSelectedRestaurant(restaurants[0]);
            setCenter([restaurants[0].lat, restaurants[0].lon]);
        }
    }, [restaurants]);

    return (
        <div className="map-container">
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
                                <div className="popup-content" onClick={() => handleRestaurantClick(restaurant)}>
                                    {restaurant.name && (
                                        <div className="popup-header">
                                            {restaurant.website ? (
                                                <img src={'https://logo.clearbit.com/' + extractDomain(restaurant.website)} alt="Restaurant Icon" className="restaurant-icon" />
                                            ) : (
                                                <FontAwesomeIcon icon={faUtensils} />
                                            )}
                                            <h1>{restaurant.name}</h1>
                                            <div className="add-rating-container">
                                                <span className="add-rating inner-text">
                                                    <FontAwesomeIcon icon={faExclamationCircle} className="fa-beat-fade" />
                                                </span>
                                                <p>{Math.floor(Math.random() * 25) + 1} Reports</p>
                                            </div>
                                        </div>
                                    )}
                                    {restaurant.address && <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {addressToString(restaurant.address)}</p>}
                                    {restaurant.serviceType && <p><FontAwesomeIcon icon={faUtensils} /> {restaurant.serviceType}</p>}
                                    {restaurant.website && (
                                        <p className="popup-website">
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
