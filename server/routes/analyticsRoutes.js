const express = require("express");

const {
  dashboardAnalytics,
} = require(
  "../controllers/analyticsController"
);

const router = express.Router();

router.get(
  "/dashboard",
  dashboardAnalytics
);

module.exports = router;