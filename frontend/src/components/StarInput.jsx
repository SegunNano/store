import React, { useState } from 'react';
import './HalfStarRating.css';
// import HalfStarRating from './HalfStarRating';
import Star from './Star';

const StarInput = () => {
    const [rating, setRating] = useState(0); // Start with no stars selected

    // Handle the change in rating
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return (
        <div>
            <div style={{ display: 'inline-block' }}>
                {/* Render 5 stars (each with 2 halves) */}
                {[...Array(5)].map((_, index) => (
                    <div key={index} style={{ display: 'inline-block' }}>
                        {/* Left half (0.5 star) */}
                        <Star
                            value={index + 1} // Rating value 1 to 5
                            isLeftHalf={true}
                            filled={rating >= index + 0.5}
                            onChange={() => handleRatingChange(index + 0.5)}
                        />

                        {/* Right half (1 full star) */}
                        <Star
                            value={index + 1} // Rating value 1 to 5
                            isLeftHalf={false}
                            filled={rating >= index + 1}
                            onChange={() => handleRatingChange(index + 1)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StarInput;
