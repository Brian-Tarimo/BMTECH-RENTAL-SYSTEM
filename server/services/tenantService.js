const express = require("express");

const {
  getTenantDashboard,
} = require("../controllers/authController"); // ❌ THIS MIGHT BE WRONG IN YOUR CASE

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// TEMP SAFE VERSION (NO EXTRA MIDDLEWARE FIRST)
router.get("/dashboard", authMiddleware, getTenantDashboard);

module.exports = router;