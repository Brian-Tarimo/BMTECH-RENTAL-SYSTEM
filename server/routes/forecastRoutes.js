const express = require("express");

const {
  getForecastData,
} = require("../controllers/forecastController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getForecastData
);

module.exports = router;