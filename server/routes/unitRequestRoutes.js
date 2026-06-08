const express = require("express");
const router = express.Router();

const {
  getAllUnitRequests,
  approveUnitRequest,
  rejectUnitRequest,
} = require("../controllers/unitRequestController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

/* GET ALL REQUESTS */
router.get(
  "/",
  authMiddleware,
  authorizeRoles("Super Admin", "Landlord"),
  getAllUnitRequests
);

/* APPROVE */
router.put(
  "/approve/:id",
  authMiddleware,
  authorizeRoles("Super Admin", "Landlord"),
  approveUnitRequest
);

/* REJECT */
router.put(
  "/reject/:id",
  authMiddleware,
  authorizeRoles("Super Admin", "Landlord"),
  rejectUnitRequest
);

module.exports = router;