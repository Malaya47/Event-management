import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const Attendees = () => {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/attendees/${eventId}/registered`)
      .then((res) => {
        setAttendees(res.data.registeredAttendees);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch attendees");
      });
  }, [eventId]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Event Attendees
      </h2>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {!error && attendees.length === 0 && (
        <div className="alert alert-info text-center">
          No attendees registered yet.
        </div>
      )}

      {!error && attendees.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendees.map((attendee, index) => (
            <div
              key={attendee._id || index}
              className="card bg-base-100 shadow-xl border"
            >
              <div className="card-body items-center text-center">
                <h3 className="card-title text-lg">
                  {attendee.userRegistered.name || "Unnamed User"}
                </h3>
                <p className="text-sm text-gray-600">
                  {attendee.userRegistered.email || "No email"}
                </p>
                <div className="mt-2">
                  <span className="badge badge-success badge-outline">
                    Registered
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Attendees;
