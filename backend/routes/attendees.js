const express = require("express");
const attendeesRouter = express.Router();

const Registration = require("../models/registration");
const User = require("../models/user");
const Event = require("../models/event");
const userAuth = require("../middlewares/auth");
const { validateAttendeeData } = require("../utils/validations");

// register for an event
attendeesRouter.post("/attendees/register", userAuth, async (req, res) => {
  try {
    // sanitize and validate data received
    validateAttendeeData(req);
    const loggedInUser = req.user;
    const { userRegistered, eventRegisteredFor } = req.body;

    // I want to check if the userRegistered is a valid user or not
    const user = await User.findById(userRegistered.toString());
    if (!user) {
      throw new Error("User not found");
    }

    // First it should check that loggedInUser should not attend the event that he has created by himself
    const event = await Event.findById(eventRegisteredFor.toString());
    if (event.createdBy.toString() === loggedInUser._id.toString()) {
      throw new Error("You cannot regester in your own event");
    }

    // I will check if the loggedInUser has already registered for the event or not if he has registered for the event then he cannot register again

    const exsistingRegistration = await Registration.findOne({
      userRegistered: loggedInUser._id,
      eventRegisteredFor: eventRegisteredFor,
    });

    if (exsistingRegistration) {
      throw new Error("You have already registered for this event");
    }

    const registration = new Registration({
      userRegistered,
      eventRegisteredFor,
    });

    await registration.save();
    res.status(200).json({
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while registering",
      error: error.message,
    });
  }
});

// get all registered attendes for a particular event
attendeesRouter.get(
  "/attendees/:eventId/registered",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      //  for particular event get all registered attendes
      const { eventId } = req.params;

      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      if (event.createdBy.toString() !== loggedInUser._id.toString()) {
        return res
          .status(403)
          .json({ message: "You are not allowed to access this event" });
      }

      const registeredAttendees = await Registration.find({
        eventRegisteredFor: eventId,
      });

      res.status(200).json({
        message: "Attendees fetched successfully",
        registeredAttendees,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occured while fetching attendees",
        error: error.message,
      });
    }
  }
);

// get all registrations by logged in user
attendeesRouter.get("/user/registrations", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const registrations = await Registration.find({
      userRegistered: loggedInUser._id,
    });

    res.status(200).json({
      message: "Registrations fetched successfully",
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while fetching registrations",
      error: error.message,
    });
  }
});

module.exports = attendeesRouter;
