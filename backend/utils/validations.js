const validator = require("validator");

const validateSignupData = (req) => {
  const allowedFields = ["name", "email", "password"];

  const isAllowed = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (!isAllowed) {
    throw new Error("Invalid fields");
  }

  if (!validator.isEmail(req.body.email)) {
    throw new Error("Email is invalid");
  }

  if (!validator.isStrongPassword(req.body.password)) {
    throw new Error(
      "Password should have at least one uppercase letter, one lowercase letter, one number and one special character"
    );
  }
};

const validateLoginData = (req) => {
  const allowedFields = ["email", "password"];

  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const isAllowed = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  if (!isAllowed) {
    throw new Error("Invalid fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should have at least one uppercase letter, one lowercase letter, one number and one special character"
    );
  }
};

module.exports = {
  validateSignupData,
  validateLoginData,
};
