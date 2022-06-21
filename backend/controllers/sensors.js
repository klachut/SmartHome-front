const Sensor = require("../models/Sensor");
const { getIO } = require("../web-socket");

const getAllSensors = async (req, res) => {
  const sensors = await Sensor.find({});
  res.status(200).json(sensors);
};

const addSensor = async (req, res) => {
  const body = req.body;
  const newSensor = await Sensor.create(body);
  getIO().emit("add sensor", newSensor);
  return res.status(201).json(newSensor);
};

const updateSensor = async (req, res) => {
  const { isActivated } = req.body;
  const id = req.params.id;

  const updatedSensor = await Sensor.findByIdAndUpdate(
    id,
    { isActivated },
    { new: true }
  );
  getIO().emit("update sensor", updatedSensor);
  return res.status(200).json(updatedSensor);
};

const removeSensor = async (req, res) => {
  const id = req.params.id;
  await Sensor.findOneAndDelete(id);
  getIO().emit("remove sensor", id);
  return res.status(200).end();
};

module.exports = { getAllSensors, addSensor, updateSensor, removeSensor };
