import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Import components
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Calendar from './components/Calendar'; 
import Domains from './components/Domains';
import DomainDetails from './components/DomainDetails';
import ProjectPage from './components/ProjectPage';
import ResultsPage from './components/ResultsPage';
import AboutClub from './components/AboutClubPage'; // AboutClub component
import Sidebar from './components/SideBar';
import EventInfo from './components/EventInfo';

import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState({}); // For checkbox filters

  useEffect(() => {
    // Fetch data from the server
    axios.get('http://localhost:5001/domain/computer')
      .then(response => setMessage(response.data)) // Assuming server responds with data
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fetch and initialize events
  useEffect(() => {
    // Simulating event fetching
    const mockEvents = [
      { id: 1, name: 'Event 1', category: 'Workshop' },
      { id: 2, name: 'Event 2', category: 'Seminar' },
      { id: 3, name: 'Event 3', category: 'Hackathon' },
    ];
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  // Filter events based on the selected categories
  useEffect(() => {
    const filtered = events.filter(event => filters[event.category]);
    setFilteredEvents(filtered);
  }, [filters, events]);

  // Update filter states when checkboxes change
  const handleFilterChange = (category, isChecked) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: isChecked,
    }));
  };

  // Add a new event to the list
  const addEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  return (
    <Router>
      <Navbar /> {/* Always display the navbar */}
      <div className="App">
        <div className="container">
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />

            {/* Calendar Route with Sidebar and Checkboxes */}
            <Route 
              path="/calendar" 
              element={
                <>
                  <Sidebar 
                    filterEvents={handleFilterChange} // Pass filter handler to Sidebar
                    addEvent={addEvent} 
                  />
                  <Calendar events={filteredEvents} setSelectedEvent={setSelectedEvent} />
                </>
              }
            />

            <Route path="/domains" element={<Domains />} />
            <Route path="/projectpage" element={<ProjectPage />} />
            <Route path="/results" element={<ResultsPage />} />

            {/* New Route for About Club */}
            <Route path="/about-club" element={<AboutClub />} />

            {/* Dynamic Route for Domain Details */}
            <Route path="/domain/:domainId" element={<DomainDetails />} />
            <Route path="/results/:clubName" element={<ResultsPage />} /> // Add this line

            {/* Fallback Route */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>

          {/* Event Info Section */}
          {selectedEvent && <EventInfo selectedEvent={selectedEvent} />}
        </div>
      </div>
    </Router>
  );
}

export default App;