const express = require("express");
const eventRouter = express.Router();
const Event = require("../models/event");
const userAuth = require("../middlewares/auth");

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

module.exports = eventRouter;
