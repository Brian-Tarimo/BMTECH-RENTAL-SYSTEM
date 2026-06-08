const Tenant = require("../models/Tenant");

const tenantAccessGuard = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "Tenant") {
      return next();
    }

    const tenant = await Tenant.findOne({
      user: req.user.id,
    });

    if (!tenant) {
      return res.status(403).json({
        message: "Tenant profile missing",
      });
    }

    if (tenant.status !== "Active") {
      return res.status(403).json({
        message: "Account not approved yet",
      });
    }

    req.tenant = tenant;
    next();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = tenantAccessGuard;