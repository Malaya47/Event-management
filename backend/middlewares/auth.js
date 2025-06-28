const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Token is not provided");
    }

    const decodedToken = jwt.verify(token, "your_jwt_secret");

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    const { _id } = decodedToken;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
};

module.exports = userAuth;
