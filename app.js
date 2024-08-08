const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

const curriculum = require("./routes/curriculum");
const calender = require("./routes/calender");
const assessment = require("./routes/assessment");

app.use("/api/v1", curriculum);
app.use("/api/v1", calender);
app.use("/api/v1", assessment);

// Simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
