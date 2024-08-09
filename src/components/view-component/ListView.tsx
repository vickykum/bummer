import React, { useState } from 'react';
import './ListView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Restaurant } from '../../models/RestaurantModels';
import { extractDomain } from '../../utils/UrlUtils';
import { useNavigate } from 'react-router-dom';
// Import icons
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface ListViewProps {
  restaurants: Restaurant[];
}

const ListView: React.FC<ListViewProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurant: Restaurant) => {
    navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } });
  };

  return (
    <div className="list-view">
      {restaurants.length === 0 ? (
        <p>No restaurants found</p>
      ) : (
        <ul>
          {restaurants.map((restaurant, index) => (
            <li key={index} className={selectedRestaurant === restaurant ? 'selected' : ''}>
              <div className="restaurant-header" onClick={() => handleRestaurantClick(restaurant)}>
                <div className="restaurant-info">
                  <h3>
                    {restaurant.website ? (
                      <img src={`https://logo.clearbit.com/${extractDomain(restaurant.website)}`} alt="Restaurant Icon" className="restaurant-icon" />
                    ) : (
                      <FontAwesomeIcon icon={faUtensils} className="fa-icon" />
                    )}
                    {restaurant.name}
                  </h3>
                  <p>{restaurant.address}</p>
                </div>
                <div className="add-rating-container">
                  <span className="add-rating">
                    <FontAwesomeIcon icon={faExclamationCircle} className="fa-beat-fade" />
                  </span>
                  <p>{Math.floor(Math.random() * 25) + 1} Reports</p>
                </div>
              </div>
              {selectedRestaurant === restaurant && (
                <div className="restaurant-details">
                  {/* RestaurantDetails component should be handled by routing */}
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
