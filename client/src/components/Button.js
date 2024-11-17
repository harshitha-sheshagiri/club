import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './Button.css';

const Button = ({ text, to }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClick = () => {
    navigate(to); // Navigate to the provided route
  };

  return (
    <button onClick={handleClick} className="button">
      {text}
    </button>
  );
};

export default Button;
