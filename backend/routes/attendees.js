const express = require("express");
const attendeesRouter = express.Router();

const Registration = require("../models/registration");
const User = require("../models/user");
const userAuth = require("../middlewares/auth");
const { validateAttendeeData } = require("../utils/validations");

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
    if (userRegistered.toString() === loggedInUser._id.toString()) {
      throw new Error("You cannot register for your own event");
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

module.exports = attendeesRouter;
