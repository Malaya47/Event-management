const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

const { validateSignupData } = require("../utils/validations");

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

module.exports = authRouter;
