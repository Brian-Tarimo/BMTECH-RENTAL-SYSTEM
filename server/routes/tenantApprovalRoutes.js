const express = require("express");
const router = express.Router();

const { approveTenant } = require("../controllers/tenantApprovalController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// APPROVE TENANT
router.put(
  "/approve/:id",
  authMiddleware,
  authorizeRoles("Super Admin", "Landlord"),
  approveTenant
);

module.exports = router;