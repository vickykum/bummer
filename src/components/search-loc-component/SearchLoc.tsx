import React, { useEffect, useState } from 'react';
import { mockLocations } from '../../mock-data/RestaurantMock';
import './SearchLoc.css';

interface SearchLocProps {
  onSearch: (location: string, restaurants: any[]) => void;
  realSearchOn: boolean; // Feature flag to toggle between real-time and mock data
}

export const SearchLoc: React.FC<SearchLocProps> = ({ onSearch, realSearchOn }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);

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
        const suggestiveSearchResults = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=10&countrycodes=us`);
        const suggestionsData = await suggestiveSearchResults.json();
        setSuggestions(suggestionsData.map((item: any) => item.display_name));
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
      const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=us`);
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

  const fetchRestaurants = async (location: string) => {
    const [lat, lon] = location.split(',');
    const overpassQuery = `
      [out:json];
      node
        ["amenity"="fast_food"]
        (around:${radiusInMeters},${lat},${lon});
      out body;
    `;

    try {
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: overpassQuery,
      });
      const data = await response.json();
      const restaurants = data.elements.map((element: any) => ({
        name: element.tags.name,
        brand: element.tags.brand,
        lat: element.lat,
        lon: element.lon,
        address: (element.tags['addr:housenumber'] +' '+ element.tags['addr:street'] 
            +', '+ element.tags['addr:city']+', '+ element.tags['addr:state']+', '+ element.tags['addr:postcode']),
        category: element.tags.cuisine || 'restaurant',
        service: element.tags.amenity || '',
        website: element.tags.website,
        takeaway: element.tags.takeaway,
        phone: element.tags.phone,
        hours: element.tags.hours
      }));
      onSearch(location, restaurants);
    } catch (error) {
      console.error('Error fetching data from Overpass API:', error);
    }
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
