import React, { useState } from 'react';
import './ListView.css';
import { Restaurant } from '../../models/RestaurantModels';

interface ListViewProps {
  restaurants: Restaurant[];
}

const ListView: React.FC<ListViewProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const handleRatingClick = (restaurant: Restaurant, rating: string) => {
    if (!selectedRating) {
      restaurant.rating = rating;
    }
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant === selectedRestaurant ? null : restaurant);
  };

  return (
    <div className="list-view">
      <h2>List View</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants found</p>
      ) : (
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={index}>
              <div className="restaurant-header">
                <div className="restaurant-info" onClick={() => handleRestaurantClick(restaurant)}>
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.address}</p>
                </div>
                <div className="rating-section">
                  {(!restaurant.rating || restaurant.rating==='Yay') && <span
                    className={`rating-emoji ${selectedRating === 'Yay' ? 'selected' : ''}`}
                    onClick={() => handleRatingClick(restaurant, 'Yay')}
                  >
                    😋
                    <span className="tooltip">Yay</span>
                  </span>}
                  {(!restaurant.rating || restaurant.rating==='Ok') && <span
                    className={`rating-emoji ${selectedRating === 'Ok' ? 'selected' : ''}`}
                    onClick={() => handleRatingClick(restaurant, 'Ok')}
                  >
                    🙂
                    <span className="tooltip">Ok</span>
                  </span>}
                  {(!restaurant.rating || restaurant.rating==='Meh') && <span
                    className={`rating-emoji ${selectedRating === 'Meh' ? 'selected' : ''}`}
                    onClick={() => handleRatingClick(restaurant, 'Meh')}
                  >
                    🫤
                    <span className="tooltip">Meh</span>
                  </span>}
                  {(!restaurant.rating || restaurant.rating==='Bummer') && <span
                    className={`rating-emoji ${selectedRating === 'Bummer' ? 'selected' : ''}`}
                    onClick={() => handleRatingClick(restaurant, 'Bummer')}
                  >
                    🤬❗️
                    <span className="tooltip">Bummer</span>
                  </span>}
                </div>
              </div>
              {selectedRestaurant === restaurant && (
                <div className="restaurant-details">
                  <p><strong>Service Type:</strong> {restaurant.serviceType}</p>
                  <p><strong>Website:</strong> <a href={restaurant.website} target="_blank" rel="noopener noreferrer">{restaurant.website}</a></p>
                  <p><strong>Phone:</strong> {restaurant.phone}</p>
                  <p><strong>To-Go/Takeaway:</strong> {restaurant.takeaway}</p>
                  <p><strong>Hours:</strong> {restaurant.hours}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListView;
