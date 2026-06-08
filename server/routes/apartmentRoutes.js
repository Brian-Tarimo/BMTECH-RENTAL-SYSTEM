const express = require("express");

const {
  createApartment,
  getApartments,
  updateApartment,
  deleteApartment,
} = require("../controllers/apartmentController");

const authMiddleware =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const router = express.Router();

// Create Apartment
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "Super Admin",
    "Landlord"
  ),
  createApartment
);

// Get Apartments
router.get(
  "/",
  authMiddleware,
  getApartments
);

// Update Apartment
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "Super Admin",
    "Landlord"
  ),
  updateApartment
);

// Delete Apartment
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "Super Admin"
  ),
  deleteApartment
);

module.exports = router;