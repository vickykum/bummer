import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faPhoneAlt, faMapMarkerAlt, faClock, faExclamationCircle, faUtensils } from '@fortawesome/free-solid-svg-icons';
import './RestaurantDetails.css';
import { Restaurant } from '../../../../models/RestaurantModels';
import RatingPopup from '../rating-popup/RatingPopup';
import RatingSection from '../rating-section/RatingSection';
import { capitalizeString } from '../../../../utils/StringUtils';
import { extractDomain } from '../../../../utils/UrlUtils';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [showPopup, setShowPopup] = useState<Restaurant | null>(null);

  useEffect(() => {
    if (location.state?.restaurant) {
      setRestaurant(location.state.restaurant);
    } else if (id) {
      // Fetch restaurant details if not passed via state
      fetch(`/api/restaurants/${id}`)
        .then(response => response.json())
        .then(data => setRestaurant(data))
        .catch(error => console.error('Error fetching restaurant details:', error));
    }
  }, [id, location.state]);

  const openPopup = () => setShowPopup(restaurant);
  const closePopup = () => setShowPopup(null);

  if (!restaurant) return <p>Loading...</p>;

  return (
    <div className="restaurant-details-page">
      <div className="restaurant-details-header ">
        {restaurant.website ? (
          <img
            src={`https://logo.clearbit.com/${extractDomain(restaurant.website)}`}
            alt="Restaurant Logo"
            className="restaurant-logo"
          />
        ) : (
          <FontAwesomeIcon icon={faUtensils} className="restaurant-logo" />
        )}
        <h1>
          {restaurant.name}</h1>
      </div>
      <div className="restaurant-actions">
        <div className="action-icon" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address || '')}`, '_blank')}>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <p>Direction</p>
        </div>
        {restaurant.website && (
          <div className="action-icon">
            <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              <p>Website</p>
            </a>
          </div>
        )}
        {restaurant.phone && (
          <div className="action-icon">
            <a href={`tel:${restaurant.phone}`}>
              <FontAwesomeIcon icon={faPhoneAlt} />
              <p>Call</p>
            </a>
          </div>
        )}
        <div className="action-icon" onClick={openPopup}>
          <FontAwesomeIcon icon={faExclamationCircle} className="fa-beat-fade" />
          <p>Add Review</p>
        </div>
      </div>
      <RatingSection restaurant={restaurant} />
      <div className="restaurant-info">
        {restaurant.address && (
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Address: {restaurant.address}</p>
        )}
        {restaurant.phone && (
          <p><FontAwesomeIcon icon={faPhoneAlt} /> Phone: {restaurant.phone}</p>
        )}
        {restaurant.hours && (
          <p><FontAwesomeIcon icon={faClock} /> Hours: {restaurant.hours}</p>
        )}
        {restaurant.takeaway && (
          <p>Takeaway: {restaurant.takeaway}</p>
        )}
        {restaurant.serviceType && (
          <p>Service Type: {capitalizeString(restaurant.serviceType)}</p>
        )}
        {restaurant.rating && (
          <p>Rating: {restaurant.rating}</p>
        )}
        {restaurant.category && (
          <p>Category: {restaurant.category}</p>
        )}
      </div>
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

export default RestaurantDetails;
