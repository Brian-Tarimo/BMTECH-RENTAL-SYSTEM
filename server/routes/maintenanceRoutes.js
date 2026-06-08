const express = require("express");

const {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest,
} = require("../controllers/maintenanceController");

const upload =
  require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  createRequest
);

router.get("/", getRequests);

router.put("/:id", updateRequest);

router.delete("/:id", deleteRequest);

module.exports = router;