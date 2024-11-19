import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const SideBar = ({ setEvents }) => {
    const [filters, setFilters] = useState({
        workshop: true,
        meeting: true,
        deadline: true,
        hackathon: true,
        ideathon: true,
        cultural: true,
    });
    const [allEvents, setAllEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        title: '',
        description: '',
        category: 'workshop',
        reminder: 0,
    });

    // Fetch all events once when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5001/calendar/events')
            .then((response) => {
                setAllEvents(response.data);
                filterEvents(response.data, filters);
            })
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    // Request notification permission on mount
    useEffect(() => {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            } else {
                console.log("Notification permission denied.");
            }
        });
    }, []);

    // Handle filter changes
    const updateFilters = (category) => {
        const newFilters = { ...filters, [category]: !filters[category] };
        setFilters(newFilters);
        filterEvents(allEvents, newFilters); // Filter events based on the updated filters
    };

    // Filter events based on selected filters
    const filterEvents = (events, currentFilters) => {
        const filteredEvents = events.filter(event => currentFilters[event.category]);
        setEvents(filteredEvents);  // Update the events in Calendar.js
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddEvent = () => {
        setShowForm(!showForm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.date && formData.title && formData.category && formData.reminder >= 0) {
            const newEvent = { ...formData, reminder: parseInt(formData.reminder, 10) };

            axios.post('http://localhost:5001/calendar/events', newEvent)
                .then((response) => {
                    alert('Event added successfully!');
                    setShowForm(false);
                    setFormData({ date: '', title: '', description: '', category: 'workshop', reminder: 0 });
                    const updatedEvents = [...allEvents, response.data];
                    setAllEvents(updatedEvents);
                    filterEvents(updatedEvents, filters);
                })
                .catch((error) => console.error('Error adding event:', error));
        } else {
            alert('Please fill out all required fields.');
        }
    };

    return (
        <div className="sidebar">
            <button id="add-event-btn" onClick={handleAddEvent}>Add Event</button>

            {showForm && (
                <form onSubmit={handleSubmit} className="event-form">
                    <h3>Add a New Event</h3>

                    {/* Date Input */}
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        required
                    />

                    {/* Title Input */}
                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        value={formData.title}
                        onChange={handleFormChange}
                        required
                    />

                    {/* Description Input */}
                    <textarea
                        name="description"
                        placeholder="Event Description"
                        value={formData.description}
                        onChange={handleFormChange}
                        rows="3"
                    />

                    {/* Category Select */}
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        required
                    >
                        <option value="workshop">Workshop</option>
                        <option value="meeting">Meeting</option>
                        <option value="deadline">Deadline</option>
                        <option value="hackathon">Hackathon</option>
                        <option value="ideathon">Ideathon</option>
                        <option value="cultural">Cultural</option>
                    </select>

                    {/* Reminder Input */}
                    <input
                        type="number"
                        name="reminder"
                        placeholder="Reminder (minutes)"
                        value={formData.reminder}
                        onChange={handleFormChange}
                        required
                    />

                    {/* Save Button */}
                    <button type="submit">Save Event</button>
                </form>
            )}
        </div>
    );
};

export default SideBar;