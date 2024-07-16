import React, { useState } from 'react';
import './ListView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMapMarkerAlt, faGlobe, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { Restaurant } from '../../models/RestaurantModels';
import { extractDomain } from '../../utils/UrlUtils';

interface ListViewProps {
  restaurants: Restaurant[];
}

const ListView: React.FC<ListViewProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleRatingClick = (restaurant: Restaurant, rating: string) => {
    if (restaurant.rating === rating) {
      restaurant.rating = undefined; // Clear the rating if it's already selected
    } else {
      restaurant.rating = rating; // Set the new rating
    }
    setSelectedRestaurant({ ...restaurant });
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
            <li key={index} className={selectedRestaurant === restaurant ? 'selected' : ''}>
              <div className="restaurant-header">
                <div className="restaurant-info" onClick={() => handleRestaurantClick(restaurant)}>
                  <h3>
                    {restaurant.website ? (
                      <img src={'https://logo.clearbit.com/' + extractDomain(restaurant.website)} alt="Restaurant Icon" className="restaurant-icon" />
                    ) : (
                      <FontAwesomeIcon icon={faUtensils} className="fa-icon" />
                    )}
                    {restaurant.name}
                  </h3>
                  <p>{restaurant.address}</p>
                </div>
                <div className="rating-section">
                  {(!restaurant.rating || restaurant.rating === 'Yay') && (
                    <span
                      className={`rating-emoji ${restaurant.rating === 'Yay' ? 'selected' : ''}`}
                      onClick={() => handleRatingClick(restaurant, 'Yay')}
                    >
                      😋
                      <span className="tooltip">Yay</span>
                    </span>
                  )}
                  {(!restaurant.rating || restaurant.rating === 'Ok') && (
                    <span
                      className={`rating-emoji ${restaurant.rating === 'Ok' ? 'selected' : ''}`}
                      onClick={() => handleRatingClick(restaurant, 'Ok')}
                    >
                      🙂
                      <span className="tooltip">Ok</span>
                    </span>
                  )}
                  {(!restaurant.rating || restaurant.rating === 'Meh') && (
                    <span
                      className={`rating-emoji ${restaurant.rating === 'Meh' ? 'selected' : ''}`}
                      onClick={() => handleRatingClick(restaurant, 'Meh')}
                    >
                      🫤
                      <span className="tooltip">Meh</span>
                    </span>
                  )}
                  {(!restaurant.rating || restaurant.rating === 'Bummer') && (
                    <span
                      className={`rating-emoji ${restaurant.rating === 'Bummer' ? 'selected' : ''}`}
                      onClick={() => handleRatingClick(restaurant, 'Bummer')}
                    >
                      🤬
                      <span className="tooltip">Bummer</span>
                    </span>
                  )}
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
