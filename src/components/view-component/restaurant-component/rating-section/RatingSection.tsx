import React, { useState } from 'react';
import { Badge } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './RatingSection.css';
import { Restaurant } from '../../../../models/RestaurantModels';

// Import SVGs
import yayLogo from '../../../../logos/emoji-logos/emoji-yay-green.svg';
import okLogo from '../../../../logos/emoji-logos/emoji-ok-blue.svg';
import mehLogo from '../../../../logos/emoji-logos/emoji-meh-orange.svg';
import bummerLogo from '../../../../logos/emoji-logos/emoji-bummer-red.svg';

interface RatingSectionProps {
    restaurant: Restaurant;
}

type Rating = 'Yay' | 'Ok' | 'Meh' | 'Bummer';

const RatingSection: React.FC<RatingSectionProps> = ({ restaurant }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
    const [filterText, setFilterText] = useState('');
    const [upvoteClicked, setUpvoteClicked] = useState<boolean | null>(null);
    const [downvoteClicked, setDownvoteClicked] = useState<boolean | null>(null);

    const ratingCounts: { Yay: number; Ok: number; Meh: number; Bummer: number } = {
        Yay: 5,
        Ok: 2,
        Meh: 3,
        Bummer: 6
    };

    const reviews: {
        Yay: string[];
        Ok: string[];
        Meh: string[];
        Bummer: string[];
    } = {
        Yay: [
            'The food was amazing! Everything was fresh and delicious. I will definitely come back.',
            'Best dining experience ever! The service was outstanding, and the atmosphere was great.',
            'Incredible flavors and a great menu. Highly recommend for anyone looking for a top-notch meal.'
        ],
        Ok: [
            'The food was decent, but I’ve had better. Nothing special about this place.',
            'It was okay. The service was a bit slow, but the food was acceptable.',
            'Not bad, but not great either. I might return, but not in a hurry.'
        ],
        Meh: [
            'The food was mediocre. It lacked flavor and was underwhelming.',
            'Service was alright, but the food did not impress. I expected more.',
            'It was an average meal. Nothing stood out, and it was a bit pricey for what it was.'
        ],
        Bummer: [
            'Extremely disappointing. The food was cold and the service was terrible.',
            'I had a terrible experience. The food was not fresh, and the staff was rude.',
            'Not worth the price. The meal was awful, and I do not recommend this place at all.'
        ]
    };

    const handleRatingClick = (rating: Rating) => {
        setSelectedRating(rating);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedRating(null);
    };

    const filteredReviews = selectedRating ? reviews[selectedRating].filter(review =>
        review.toLowerCase().includes(filterText.toLowerCase())
    ) : [];

    const handleUpvoteClick = () => {
        setUpvoteClicked(true);
        setDownvoteClicked(false);
    };

    const handleDownvoteClick = () => {
        setUpvoteClicked(false);
        setDownvoteClicked(true);
    };

    return (
        <div className="rating-section">
            {Object.entries(ratingCounts).map(([rating, count]) => (
                <Badge
                    key={rating}
                    badgeContent={count}
                    color="error"
                    sx={{ '.MuiBadge-dot': { backgroundColor: 'red' } }}
                >
                    <span
                        className={`rating-emoji ${restaurant.rating === rating ? 'selected' : ''}`}
                        onClick={() => handleRatingClick(rating as Rating)}
                    >
                        {rating === 'Yay' && <img src={yayLogo} alt="Yay" />}
                        {rating === 'Ok' && <img src={okLogo} alt="Ok" />}
                        {rating === 'Meh' && <img src={mehLogo} alt="Meh" />}
                        {rating === 'Bummer' && <img src={bummerLogo} alt="Bummer" />}
                        <span className="tooltip">{rating}</span>
                    </span>
                </Badge>
            ))}
            {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="rating-popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="popup-close" onClick={handleClosePopup}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <div className='review-popup-header'>
                            <h3>{selectedRating} Reviews</h3>
                            <h3>{restaurant.name}</h3>
                        </div>
                        <div className='review-popup-body'>
                            <input
                                type="text"
                                placeholder="Search reviews"
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                            <div className="review-list">
                                {filteredReviews.length > 0 ? (
                                    filteredReviews.map((review, index) => (
                                        <Review key={index} review={review} />
                                    ))
                                ) : (
                                    <p>No reviews found</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Review: React.FC<{ review: string }> = ({ review }) => {
    const [upvoteClicked, setUpvoteClicked] = useState(false);
    const [downvoteClicked, setDownvoteClicked] = useState(false);

    return (
        <div className="review">
            <div className='review-text'>
                <p>{review}</p>
            </div>
            <div className="review-votes">
                <button
                    className={`vote-button ${upvoteClicked ? 'upvoted' : ''}`}
                    onClick={() => {
                        if (!upvoteClicked) {
                            setUpvoteClicked(true);
                            setDownvoteClicked(false);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button
                    className={`vote-button ${downvoteClicked ? 'downvoted' : ''}`}
                    onClick={() => {
                        if (!downvoteClicked) {
                            setDownvoteClicked(true);
                            setUpvoteClicked(false);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowDown} />
                </button>
            </div>
        </div>
    );
};

export default RatingSection;
