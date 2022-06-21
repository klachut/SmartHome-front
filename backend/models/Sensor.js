const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  isActivated: Boolean,
  name: String,
  type: String,
  room: String,
});

module.exports = mongoose.model("Sensor", sensorSchema);
