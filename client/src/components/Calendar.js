import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const Calendar = ({ setSelectedEvent }) => {
    const [events, setEvents] = useState([]);
    const [filters, setFilters] = useState({
        workshop: true,
        meeting: true,
        deadline: true,
        hackathon: true,
        ideathon: true,
        cultural: true,
    });

    const daysInMonth = new Date(2024, 11, 0).getDate(); // November 2024

    // Fetch events from the backend
    useEffect(() => {
        axios.get('http://localhost:5001/calendar/events')
            .then((response) => setEvents(response.data))
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    // Filter events based on selected categories
    const getFilteredEvents = () => {
        return events.filter(event => filters[event.category]);
    };

    const getEventsForDay = (day) => getFilteredEvents().filter(event => new Date(event.date).getDate() === day);

    const getEventColor = (category) => {
        switch (category) {
            case 'workshop': return 'blue';
            case 'meeting': return 'purple';
            case 'deadline': return 'red';
            case 'hackathon': return 'orange';
            case 'ideathon': return 'cyan';
            case 'cultural': return 'green';
            default: return 'gray';
        }
    };

    // Update filters when checkboxes are toggled
    const updateFilter = (category) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: !prevFilters[category],
        }));
    };

    return (
        <div className="calendar-container">
            <div className="filter-row">
                {Object.keys(filters).map((key) => (
                    <div key={key} className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={filters[key]}
                            onChange={() => updateFilter(key)}
                        />
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                    </div>
                ))}
            </div>

            <div className="calendar">
                <div className="month">November 2024</div>

                <div className="days">
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                        <div key={day} className="day" onClick={() => setSelectedEvent(getEventsForDay(day)[0])}>
                            {day}
                            {getEventsForDay(day).map(event => (
                                <div
                                    key={event._id}
                                    className={`event ${event.category}`}
                                    style={{ backgroundColor: getEventColor(event.category) }}
                                >
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;