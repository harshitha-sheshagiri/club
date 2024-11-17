import React from 'react';
import './Card.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Card = ({ title, roles, image, button1, button2 }) => {
  // Convert title to a URL-friendly format
  const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <div className="card-roles">
          {roles.map((role, index) => (
            <p key={index}>{role}</p>
          ))}
        </div>
      </div>
      <div className="card-buttons">
        {/* Button for "About Club" page */}
        <Button text={button1.text} to="/about-club" />
        {/* Button for dynamic Results page */}
        <Button text={button2.text} to={`/results/${formattedTitle}`} />
      </div>
    </div>
  );
};

export default Card;
