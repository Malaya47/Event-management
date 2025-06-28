const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
      minLength: 50,
    },
    location: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    date: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
