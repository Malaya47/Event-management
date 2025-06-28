const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
      maxLength: 20,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password should have at least one uppercase letter, one lowercase letter, one number and one special character"
          );
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = user;
