import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './RestaurantDetails.css';
import { Restaurant } from '../../../../models/RestaurantModels';
import { capitalizeString } from '../../../../utils/StringUtils';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ restaurant }) => {
  return (
    <div className="restaurant-details open">
      <p><strong>Service Type:</strong> {capitalizeString(restaurant.serviceType)}</p>
      <p><strong>Website:</strong> <a href={restaurant.website} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faExternalLinkAlt} /></a></p>
      <p><strong>Phone:</strong> {restaurant.phone}</p>
      <p><strong>To-Go/Takeaway:</strong> {restaurant.takeaway}</p>
      <p><strong>Hours:</strong> {restaurant.hours}</p>
    </div>
  );
};

export default RestaurantDetails;
