const express = require("express");
const router = express.Router();

/* CONTROLLERS */
const {
  createTenant,
  getTenants,
  moveOutTenant,
} = require("../controllers/tenantController");

const {
  getTenantDashboard,
  getVacantUnits,
  requestUnit,
} = require("../controllers/tenantPortalController");

/* MIDDLEWARES */
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const tenantAccessGuard = require("../middleware/tenantAccessMiddleware");
const { getPaymentHistory } = require("../controllers/paymentController");

/* =========================
   CREATE TENANT
========================= */
router.post(
  "/",
  authMiddleware,
  authorizeRoles("Super Admin", "Landlord"),
  upload.array("documents", 5),
  createTenant
);

/* =========================
   GET ALL TENANTS
========================= */
router.get(
  "/",
  authMiddleware,
  authorizeRoles("Super Admin", "Landlord", "Accountant"),
  getTenants
);

/* =========================
   MOVE OUT TENANT
========================= */
router.put(
  "/moveout/:id",
  authMiddleware,
  authorizeRoles("Super Admin", "Landlord", "Caretaker"),
  moveOutTenant
);

/* =========================
   TENANT DASHBOARD
========================= */
router.get(
  "/dashboard",
  authMiddleware,
  tenantAccessGuard,
  getTenantDashboard
);

/* =========================
   VACANT UNITS
========================= */
router.get(
  "/vacant-units",
  authMiddleware,
  getVacantUnits
);

/* =========================
   UNIT REQUEST
========================= */
router.post(
  "/request-unit",
  authMiddleware,
  requestUnit
);

router.get(
  "/payments",
  authMiddleware,
  getPaymentHistory
);

module.exports = router;