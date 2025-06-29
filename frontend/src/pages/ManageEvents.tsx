import { useState, useEffect } from "react";
import API from "../api";
import { Link } from "react-router-dom";

const ManageEvents = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    API.get("/event/manageEvents")
      .then((res: any) => setEvents(res.data.events))
      .catch((err: any) => console.log("Fetch failed", err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", location: "", date: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.patch(`/event/edit/${editingId}`, formData);
      } else {
        await API.post("/event/create", formData);
      }
      resetForm();
      fetchEvents();
    } catch (error: any) {
      alert(error.response?.data?.error || "Error saving event");
    }
  };

  const handleEdit = (event: any) => {
    setEditingId(event._id);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      date: new Date(event.date).toISOString().split("T")[0],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: any) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await API.delete(`/event/delete/${id}`);
      fetchEvents();
    } catch (error) {
      alert("Delete failed");
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? "Edit Event" : "Create New Event"}
      </h2>

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="input input-bordered"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          className="textarea textarea-bordered"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          className="input input-bordered"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="input input-bordered"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update Event" : "Create Event"}
          </button>
          {editingId && (
            <button type="button" className="btn btn-ghost" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">My Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events?.length === 0 && <p>No events found</p>}
        {events.map((event: any) => (
          <div key={event._id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{event.title}</h2>
              <p>{event.description}</p>
              <p className="text-sm text-gray-500">
                📍 {event.location} | 📅{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <Link
                to={`/dashboard/attendees/${event._id}`}
                className="text-blue-700"
              >
                Click here to see attendees
              </Link>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => handleEdit(event)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;
