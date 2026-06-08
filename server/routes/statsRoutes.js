const express = require("express");
const router = express.Router();

const Tenant = require("../models/Tenant");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const pendingTenants = await Tenant.countDocuments({
      status: "Pending",
    });

    const totalUsers = await User.countDocuments();

    const activeUsers = await User.countDocuments({
      status: "Active",
    });

    res.json({
      pendingTenants,
      totalUsers,
      activeUsers,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;