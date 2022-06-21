const express = require("express");

const router = express.Router();

const {
  addSensor,
  getAllSensors,
  updateSensor,
  removeSensor,
} = require("../controllers/sensors");

router.route("/:id").patch(updateSensor).delete(removeSensor);
router.route("/").post(addSensor).get(getAllSensors);

module.exports = router;
