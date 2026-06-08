const express = require("express");

const {
  getUsers,
  updateUserStatus,
  deleteUser,
  approveTenant,
} = require("../controllers/userManagementController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// GET ALL USERS
router.get(
  "/users",
  authMiddleware,
  authorizeRoles("Super Admin"),
  getUsers
);

// UPDATE STATUS (Active / Suspended / Pending)
router.put(
  "/status/:id",
  authMiddleware,
  authorizeRoles("Super Admin"),
  updateUserStatus
);

// APPROVE TENANT
router.put(
  "/approve/:id",
  authMiddleware,
  authorizeRoles("Super Admin", "Landlord"),
  approveTenant
);

// DELETE USER
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("Super Admin"),
  deleteUser
);

module.exports = router;