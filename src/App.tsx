import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SearchLoc from './components/search-loc-component/SearchLoc';
import ListView from './components/view-component/ListView';
import MapView from './components/view-component/MapView';
import RestaurantDetails from './components/view-component/restaurant-component/restaurant-details/RestaurantDetails';
import { mockLocations, mockRestaurants } from './mock-data/RestaurantMock';
import './App.css';
import { Restaurant } from './models/RestaurantModels';
import bummerLogo from './logos/bummer-logos/bummer-name-animated.svg';

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
    <Router basename='/bummer'>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="app-header">
                  <span className="bummer-logo"><img src={bummerLogo} alt="BUMMER❗" /></span>
                </header>
                <SearchLoc onSearch={handleLocationSearch} realSearchOn={true} />
                <div className="toggle-container">
                  <label className="switch">
                    Map View
                    <input
                      type="checkbox"
                      checked={view === 'map'}
                      onChange={() => setView(view === 'list' ? 'map' : 'list')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                {view === 'list' ? (
                  <ListView restaurants={restaurants} />
                ) : (
                  <MapView restaurants={restaurants} />
                )}
                {message && <p className="error-message">{message}</p>}
              </>
            }
          />
          <Route
            path="/restaurant/:id"
            element={<RestaurantDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
