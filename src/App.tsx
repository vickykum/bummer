import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchLoc from './components/search-loc-component/SearchLoc';
import ListView from './components/view-component/ListView';
import MapView from './components/view-component/MapView';
import { mockLocations, mockRestaurants } from './mock-data/RestaurantMock';
import './App.css';
import { Restaurant } from './models/RestaurantModels';

const API_KEY = true;

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [message, setMessage] = useState('');

  const handleLocationSearch = async (searchLocation: string, restaurantList: Restaurant[]) => {
    if (API_KEY) {
      setRestaurants(restaurantList);
    } else {
      const coords = mockLocations[searchLocation];
      if (coords) {
        setRestaurants(mockRestaurants.filter(restaurant =>
          coords.some(coord => 
            restaurant.lat === coord[0] && restaurant.lon === coord[1]
          )
        ));
        setMessage('');
      } else {
        setMessage('Invalid address.');
      }
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        BUMMER <span className="red-exclamation">❗</span>
      </header>
      <SearchLoc onSearch={handleLocationSearch} realSearchOn={true}/>
      <div className="toggle-container">
        <label className="switch">
        Map View
          <input type="checkbox" checked={view === 'map'} onChange={() => setView(view === 'list' ? 'map' : 'list')} />
          <span className="slider"></span>
        </label>
      </div>
      {view === 'list' ? (
        <ListView restaurants={restaurants} />
      ) : (
        <MapView restaurants={restaurants} />
      )}
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default App;

