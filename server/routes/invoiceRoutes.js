const express = require("express");

const {
  createInvoice
} = require("../controllers/invoiceController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizePermissions = require("../middleware/permissionMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizePermissions("create_invoice"),
  createInvoice
);

module.exports = router;