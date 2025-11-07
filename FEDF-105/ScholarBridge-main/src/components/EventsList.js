import React, { useState, useEffect } from "react";
import { api } from "../api/client";
import "./EventsList.css";

function Events() {
  const [clubName, setClubName] = useState("");
  const [clubs, setClubs] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    date: "",
    description: "",
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events from backend
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await api.getEvents();
        if (mounted) setEvents(data);
      } catch (e) {
        if (mounted) setError(e.message || "Failed to load events");
      }
      if (mounted) setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  // Handle club submit
  const handleClubSubmit = (e) => {
    e.preventDefault();
    if (!clubName.trim()) return;
    setClubs((prev) => [...prev, clubName.trim()]);
    setClubName("");
  };

  // Handle event input change
  const handleEventChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  // Handle event submit via API
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!event.title || !event.date || !event.description) return;

    try {
      const newEvt = await api.createEvent({
        clubName: clubs.length > 0 ? clubs[clubs.length - 1] : "",
        title: event.title,
        date: event.date,
        description: event.description,
      });
      setEvent({ title: "", date: "", description: "" });
      setEvents((prev) => [newEvt, ...prev]);
    } catch (error) {
      console.error("Error adding event: ", error);
      setError(error.message || "Failed to save event");
      alert("Failed to save event. " + (error.message || ""));
    }
  };

  return (
    <div className="events-container">
      <h2>If you’re a club member, please enter your club name below</h2>
      <form onSubmit={handleClubSubmit} className="clubs-form">
        <input
          type="text"
          placeholder="Enter Club Name"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          required
          className="input-text"
        />
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>

      {clubs.length > 0 && (
        <div className="clubs-section">
          <h3>Clubs Entered:</h3>
          <ul>
            {clubs.map((club, idx) => (
              <li key={idx}>{club}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="event-form-section">
        <h2>Enter Event Details</h2>
        <form onSubmit={handleEventSubmit} className="event-form">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={event.title}
            onChange={handleEventChange}
            required
            className="input-text"
          />
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleEventChange}
            required
            className="input-date"
          />
          <input
            type="text"
            name="description"
            placeholder="Event Description"
            value={event.description}
            onChange={handleEventChange}
            required
            className="input-text"
          />
          <button type="submit" className="btn-submit">
            Add Event
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length > 0 ? (
        <div className="events-list-section">
          <h3>Events:</h3>
          <ul className="events-list">
            {events.map((evt) => (
              <li key={evt._id || evt.id} className="event-item">
                <strong>{evt.title}</strong> ({new Date(evt.date).toLocaleDateString()})
                <br />
                {evt.description}
                {evt.clubName && <em> — {evt.clubName}</em>}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default Events;
