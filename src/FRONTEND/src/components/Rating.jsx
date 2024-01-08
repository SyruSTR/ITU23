// RatingCircle.js

import React from 'react';
import PropTypes from 'prop-types';
import './Rating.css';

const Rating = ({ rating, onChange }) => {
  const maxRating = 5;

  const handleCircleClick = (value) => {
    onChange(value);
  };

  return (
    <div className="rating-circle-container">
      {[...Array(maxRating)].map((_, index) => (
        <div
          key={index}
          className={`rating-circle ${index < rating ? 'filled' : ''}`}
          onClick={() => handleCircleClick(index + 1)}
        ></div>
      ))}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Rating;
