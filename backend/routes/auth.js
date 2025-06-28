const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  validateSignupData,
  validateLoginData,
} = require("../utils/validations");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await user.save();
    res.status(200).json({
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while registering user",
      error: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // sanitize and validate data received
    validateLoginData(req);
    const { email, password } = req.body;
    // check if user exsists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "your_jwt_secret", {
        expiresIn: "1d",
      });
      res.status(200).json({
        message: "Login successful",
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occured while logging in",
      error: error.message,
    });
  }
});

module.exports = authRouter;
