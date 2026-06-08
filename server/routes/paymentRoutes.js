const express = require("express");
const router = express.Router();

const { initiatePayment } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

/* =========================
   STK PUSH ROUTE
========================= */
router.post(
  "/stk",
  authMiddleware,
  initiatePayment
);

module.exports = router;