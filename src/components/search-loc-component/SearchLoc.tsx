import React, { useEffect, useState } from 'react';
import { mockLocations } from '../../mock-data/RestaurantMock';
import './SearchLoc.css';
import { Restaurant } from '../../models/RestaurantModels';

interface SearchLocProps {
    onSearch: (location: string, restaurants: any[]) => void;
    realSearchOn: boolean; // Feature flag to toggle between real-time and mock data
}

export const SearchLoc: React.FC<SearchLocProps> = ({ onSearch, realSearchOn }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
    const [countryCode, setCountryCode] = useState((Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1] || 'us')); // Default country code

    useEffect(() => {
        if (navigator.geolocation && realSearchOn) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation(position);
                    const location = `${position.coords.latitude},${position.coords.longitude}`;
                    fetchRestaurants(location);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, [realSearchOn]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        if (realSearchOn) {
            if (value.length) {
                try {
                    const suggestiveSearchResults = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=10&countrycodes=${countryCode}`);
                    if (!suggestiveSearchResults.ok) {
                        throw new Error(`HTTP error! status: ${suggestiveSearchResults.status}`);
                    }
                    const suggestionsData = await suggestiveSearchResults.json();
                    setSuggestions(suggestionsData.map((item: any) => item.display_name));
                } catch (error) { 
                    console.error('Error fetching search suggestions:', error);
                }
            } else {
                setSuggestions([]);
            }
        } else {
            if (value.length) {
                const filteredSuggestions = Object.keys(mockLocations)
                    .filter((location) => location.toLowerCase().includes(value.toLowerCase()))
                    .sort((a, b) => a.toLowerCase().indexOf(value.toLowerCase()) - b.toLowerCase().indexOf(value.toLowerCase()))
                    .slice(0, 10);
                setSuggestions(filteredSuggestions);
            } else {
                setSuggestions([]);
            }
        }
    };

    const handleSelect = (suggestion: string) => {
        setInput(suggestion);
        setSuggestions([]);
        if (realSearchOn) {
            geocodeAndFetchRestaurants(suggestion);
        } else {
            onSearch(suggestion, mockLocations[suggestion] || []);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (realSearchOn) {
            geocodeAndFetchRestaurants(input);
        } else {
            onSearch(input, mockLocations[input] || []);
        }
    };

    const geocodeAndFetchRestaurants = async (address: string) => {
        try {
            const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=${countryCode}`);
            if (!geocodeResponse.ok) {
                throw new Error(`HTTP error! status: ${geocodeResponse.status}`);
            }
            const geocodeData = await geocodeResponse.json();
            if (geocodeData && geocodeData.length > 0) {
                const { lat, lon } = geocodeData[0];
                fetchRestaurants(`${lat},${lon}`);
            } else {
                console.error('Geocoding failed: No results found.');
            }
        } catch (error) {
            console.error('Error fetching geocode data:', error);
        }
    };

    const radiusInMeters = 4000;

    const processRestaurantsData = async (data: any) => {
        const restaurantsWithRequiredFields: Restaurant[] = [];
        const restaurantsWithMissingFields: Restaurant[] = [];

        data.elements.forEach((element: any) => {
            const { tags, lat, lon } = element;

            if (tags && lat && lon && tags['addr:housenumber'] && tags['addr:street']) {
                const restaurant: Restaurant = {
                    name: tags.name,
                    brand: tags.brand,
                    lat,
                    lon,
                    address: `${tags['addr:housenumber'] || ''} ${tags['addr:street'] || ''}, ${tags['addr:city'] || ''}, ${tags['addr:state'] || ''}, ${tags['addr:postcode'] || ''}`.trim(),
                    category: tags.cuisine || 'restaurant',
                    serviceType: tags.amenity,
                    website: tags.website,
                    takeaway: tags.takeaway,
                    phone: tags.phone,
                    hours: tags.hours
                };

                if (restaurant.address.replace(/, /g, '') === '') {
                    restaurantsWithMissingFields.push({ ...tags, ...element });
                } else {
                    restaurantsWithRequiredFields.push(restaurant);
                }
            } else if (tags && tags.name && tags.website && lat && lon) {
                restaurantsWithMissingFields.push({...tags, ...element });
            }
        });
        console.log(restaurantsWithMissingFields);

        return [...restaurantsWithRequiredFields, ...restaurantsWithMissingFields];
    };

    const fetchRestaurants = async (location: string) => {
        const [lat, lon] = location.split(',');
        const overpassQuery = `
        [out:json];
        (
          // Nodes
          node
            ["amenity"~"^(fast_food|cafe|restaurant|food_court|ice_cream|pub|bar|biergarten|bbq|drinking_water|juice_bar|tea)$"]
            (around:${radiusInMeters},${lat},${lon});
        );
        out body;
        >;
        out skel qt;
      `;

        try {
            const response = await fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: overpassQuery
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const sortedRestaurants = await processRestaurantsData(data);

            const sortedByDistance = sortedRestaurants.sort((a, b) => {
                const distanceA = getDistanceFromLatLonInKm(Number(lat), Number(lon), a.lat, a.lon);
                const distanceB = getDistanceFromLatLonInKm(Number(lat), Number(lon), b.lat, b.lon);
                return distanceA - distanceB;
            });

            onSearch(location, sortedByDistance);
        } catch (error) {
            console.error('Error fetching data from Overpass API:', error);
        }
    };

    const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="Enter city or zipcode..."
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSelect(suggestion)}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchLoc;
