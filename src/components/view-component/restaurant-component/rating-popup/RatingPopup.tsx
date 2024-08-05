import React, { useState } from 'react';
import './RatingPopup.css'; // Assuming a new CSS file for RatingPopup
import { Restaurant } from '../../../../models/RestaurantModels';

interface RatingPopupProps {
  setShowPopup: (show: Restaurant | null) => void;
  showPopup: Restaurant | null;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ setShowPopup, showPopup }) => {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [review, setReview] = useState<string>('');
  const [submittedReview, setSubmittedReview] = useState<string | null>(null);
  const restaurant = showPopup;

  const handleSubmit = () => {
    if (review) {
      setSubmittedReview(review);
      setReview('');
      // Logic to handle review submission
    }
  };

  if (!showPopup) {
    return null; // Return null instead of false when not showing the popup
  }

  return (
    <div className="rating-popup">
        <h3>Review/Rating for {restaurant?.name}</h3>
      <div className="rating-options">
        {['Yay', 'Ok', 'Meh', 'Bummer'].map(rating => (
          <div
            key={rating}
            className={`rating-option ${selectedRating === rating ? 'selected' : ''}`}
            onClick={() => setSelectedRating(rating)}
          >
            {rating === 'Yay' && '😋'}
            {rating === 'Ok' && '🙂'}
            {rating === 'Meh' && '🫤'}
            {rating === 'Bummer' && '🤬'}
          </div>
        ))}
      </div>
      <div className="review-section">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review"
          />
          <button onClick={handleSubmit} disabled={!(review && selectedRating)}>Submit</button>
        </div>
      {submittedReview && (
        <div className="submitted-review">
          <p>{selectedRating} - {submittedReview}</p>
          <button onClick={() => setShowPopup(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RatingPopup;
