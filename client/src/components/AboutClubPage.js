// src/Pages/AboutClubPage/AboutClub.js
import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationCard from './RegistrationCard';
import AboutSection from './AboutSection';
import InstagramButton from './InstaButton';
import './AboutClubPage.css';

const AboutClub = () => {
  return (
    <div className="about-club">
      {/* <Link to="/" className="back-button">Back to Home</Link> */}
      <div className="container">
      <RegistrationCard />
      <div classNmae="new">
      <AboutSection />
      <InstagramButton />
      </div>
        
      </div>
    </div>
  );
};

export default AboutClub;