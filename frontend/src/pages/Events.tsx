import React, { useEffect, useState } from "react";
import API from "../api";
import { jwtDecode } from "jwt-decode";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded._id);
    }

    // Fetch public events
    API.get("/event/events")
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch(() => alert("Error fetching events"));

    // Fetch all registrations by logged-in user
    API.get("/user/registrations") // You’ll need to create this endpoint
      .then((res) => {
        const registeredEventIds = res.data.registrations.map(
          (r) => r.eventRegisteredFor
        );
        setRegisteredEventIds(registeredEventIds);
      })
      .catch(() => alert("Error fetching registration data"));
  }, []);

  const handleRegister = async (eventId: string) => {
    try {
      const payload = {
        userRegistered: userId,
        eventRegisteredFor: eventId,
      };
      const res = await API.post("/attendees/register", payload);
      alert(res.data.message);
      setRegisteredEventIds([...registeredEventIds, eventId]); // update UI
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>
              <p>{event.description}</p>
              <p className="text-sm text-gray-500">
                📍 {event.location} | 📅{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p>Oraganized By {event.createdBy.name}</p>
              <div className="card-actions justify-end mt-4">
                {registeredEventIds.includes(event._id) ? (
                  <button className="btn btn-success" disabled>
                    You have registered
                  </button>
                ) : (
                  <button
                    className="btn btn-outline btn-primary"
                    onClick={() => handleRegister(event._id)}
                  >
                    Click here to register
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
