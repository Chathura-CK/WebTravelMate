import React, { useState, useEffect } from "react";
import './Events.css';

const EventPage = ( {theme} ) => {
  const [events, setEvents] = useState([]);

  // Example event data, replace with data fetching (e.g., from an API or Firebase)
  useEffect(() => {
    const eventData = [
      {
        id: 1,
        name: "Music Concert",
        date: "2025-02-15",
        description: "A grand music concert with live bands.",
        imageUrl: "https://via.placeholder.com/300",
      },
      {
        id: 2,
        name: "Tech Conference",
        date: "2025-03-10",
        description: "A conference featuring the latest tech innovations.",
        imageUrl: "https://via.placeholder.com/300",
      },
      {
        id: 1,
        name: "Music Concert",
        date: "2025-02-15",
        description: "A grand music concert with live bands.",
        imageUrl: "https://via.placeholder.com/300",
      },
      {
        id: 2,
        name: "Tech Conference",
        date: "2025-03-10",
        description: "A conference featuring the latest tech innovations.",
        imageUrl: "https://via.placeholder.com/300",
      },
      // Add more events here
    ];
    setEvents(eventData);
  }, []);

  return (
    <div className={`event-page${theme}`}>
      <h2 className="page-title">Latest Events</h2>
      <div className="event-container">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.imageUrl} alt={event.name} className="event-image" />
            <div className="event-info">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-date">{event.date}</p>
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="page-title">Upcoming Events</h2>
      <div className="event-container">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.imageUrl} alt={event.name} className="event-image" />
            <div className="event-info">
              <h3 className="event-name">{event.name}</h3>
              <p className="event-date">{event.date}</p>
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default EventPage;