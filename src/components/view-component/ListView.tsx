import React, { useState } from 'react';
import './ListView.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Restaurant } from '../../models/RestaurantModels';
import { extractDomain } from '../../utils/UrlUtils';
import RatingSection from './restaurant-component/rating-section/RatingSection';
import RatingPopup from './restaurant-component/rating-popup/RatingPopup';
import RestaurantDetails from './restaurant-component/restaurant-details/RestaurantDetails';
// Import SVGs
import addRatingLogo from '../../logos/emoji-logos/emoji-add.svg';

interface ListViewProps {
  restaurants: Restaurant[];
}

const ListView: React.FC<ListViewProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showPopup, setShowPopup] = useState<Restaurant | null>(null);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant === selectedRestaurant ? null : restaurant);
  };

  const openPopup = (restaurant: Restaurant) => {
    setShowPopup(restaurant);
  };

  const closePopup = () => {
    setShowPopup(null);
  };

  return (
    <div className="list-view">
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
                      <img src={`https://logo.clearbit.com/${extractDomain(restaurant.website)}`} alt="Restaurant Icon" className="restaurant-icon" />
                    ) : (
                      <FontAwesomeIcon icon={faUtensils} className="fa-icon" />
                    )}
                    {restaurant.name}
                  </h3>
                  <p>{restaurant.address}</p>
                </div>
                <div className="add-rating-container">
                <span className="add-rating" onClick={() => openPopup(restaurant)}><img src={addRatingLogo} alt="➕"></img></span>
                </div>
                
              </div>
              <RatingSection 
                restaurant={restaurant}
              />
              {selectedRestaurant === restaurant && (
                <RestaurantDetails restaurant={restaurant} />
              )}
            </li>
          ))}
        </ul>
      )}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="rating-popup-container" onClick={(e) => e.stopPropagation()}>
            <RatingPopup setShowPopup={setShowPopup} showPopup={showPopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListView;
