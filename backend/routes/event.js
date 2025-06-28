const express = require("express");
const eventRouter = express.Router();
const Event = require("../models/event");
const userAuth = require("../middlewares/auth");

// create event
eventRouter.post("/event/create", userAuth, async (req, res) => {
  try {
    const allowedFields = ["title", "description", "location", "date"];
    const isAllowed = Object.keys(req.body).every((key) =>
      allowedFields.includes(key)
    );

    if (!isAllowed) {
      throw new Error("Invalid fields");
    }

    const loggedInUser = req.user;
    const { title, description, location, date } = req.body;

    // I want to keep a check that either i can make the date of event in future or at today data not in the past date

    if (new Date(date) < new Date()) {
      throw new Error(
        "Date cannot be in the past you can select future date only or at present date"
      );
    }

    const event = new Event({
      title: title,
      description: description,
      location: location,
      date: date,
      createdBy: loggedInUser._id,
    });

    const savedEvent = await event.save();
    res.status(200).json({
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while creating event",
      error: error.message,
    });
  }
});

// get all events of loggedInUser to manage
eventRouter.get("/event/manageEvents", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const events = await Event.find({ createdBy: loggedInUser._id });

    if (!events) {
      throw new Error("Events not found");
    }

    if (events.length === 0) {
      throw new Error("No events found");
    }

    res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while fetching events",
      error: error.message,
    });
  }
});

// get all events except loggedInUser events
eventRouter.get("/event/events", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const events = await Event.find({ createdBy: { $ne: loggedInUser._id } });

    if (!events) {
      throw new Error("Events not found");
    }

    if (events.length === 0) {
      throw new Error("No events found");
    }

    res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while fetching events",
      error: error.message,
    });
  }
});

module.exports = eventRouter;
