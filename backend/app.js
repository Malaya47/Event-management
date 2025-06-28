const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const port = process.env.PORT | 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
