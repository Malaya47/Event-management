const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userRegistered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  eventRegisteredFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

registrationSchema.index(
  { userRegistered: 1, eventRegisteredFor: 1 },
  { unique: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
