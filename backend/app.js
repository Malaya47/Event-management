const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/database");

require("dotenv").config();

app.use(express.json());
app.use(cors());

const authRouter = require("./routes/auth");
const eventRouter = require("./routes/event");
const attendeesRouter = require("./routes/attendees");

app.use("/", authRouter);
app.use("/", eventRouter);
app.use("/", attendeesRouter);

const PORT = process.env.PORT | 3000;

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });
