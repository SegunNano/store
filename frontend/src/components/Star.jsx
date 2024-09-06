import React from 'react';
import './HalfStarRating.css';

const Star = ({ value, filled, onChange, isLeftHalf }) => {
    const fillColor = filled ? '#E0BA07' : '#6A727F'; // Yellow if filled, gray otherwise

    return (
        <div className="half-star-rating">
            <input
                type="radio"
                id={`half-${value}-${isLeftHalf ? 'left' : 'right'}`}
                name="rating"
                value={value}
                onChange={onChange}
                className='halfStarRadio'
            />
            <label
                htmlFor={`half-${value}-${isLeftHalf ? 'left' : 'right'}`}
                className={isLeftHalf ? 'left-half' : 'right-half'}
            >
                {/* Render Left Half */}
                {isLeftHalf ? (
                    <svg
                        width="24"
                        height="48"
                        viewBox="0 0 11 20" // Adjust viewBox for the left half
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: 'inline-block' }} // Ensuring inline alignment
                    >
                        <path
                            d="M11 17.033l-4.518 2.375a1.532 1.532 0 0 1-2.226-1.616l.863-5.031-3.656-3.563a1.535 1.535 0 0 1-.387-1.574c.134-.517.576-.91 1.128-1.042l5.051-.734L11 1.27V17.033z"
                            fill={fillColor}
                        />
                    </svg>
                ) : (
                    /* Render Right Half */
                    <svg
                        width="24"
                        height="48"
                        viewBox="0 0 11 20" // Adjust viewBox for the right half
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: 'inline-block' }} // Ensuring inline alignment
                    >
                        <path
                            d="M0 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.616l-.863-5.03 3.656-3.563a1.523 1.523 0 0 0-.387-1.574c-.134-.517-.576-.91-1.128-1.042l-5.051-.734L0 1.27V17.033z"
                            fill={fillColor}
                        />
                    </svg>
                )}
            </label>
        </div>
    );
};

export default Star;
