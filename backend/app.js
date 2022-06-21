require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(cors());
const morgan = require("morgan");
app.use(morgan("tiny"));

const authMiddleware = require("./middleware/auth");
const authRouter = require("./routes/auth");
const sensorsRouter = require("./routes/sensor");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/sensors", authMiddleware, sensorsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "route not found" });
});

module.exports = app;
