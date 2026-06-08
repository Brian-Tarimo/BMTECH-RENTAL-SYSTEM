const User = require("../models/User");
const Tenant = require("../models/Tenant");

/**
 * APPROVE TENANT
 */
const approveTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    // ACTIVATE TENANT PROFILE
    tenant.status = "Active";
    await tenant.save();

    // ACTIVATE LINKED USER ACCOUNT
    const user = await User.findById(tenant.user);

    if (!user) {
      return res.status(404).json({
        message: "Linked user account not found",
      });
    }

    user.status = "Active";
    await user.save();

    res.status(200).json({
      success: true,
      message: "Tenant approved successfully",
      tenant,
    });

  } catch (error) {
    console.log("APPROVE TENANT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * REJECT TENANT
 */
const rejectTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    tenant.status = "Rejected";
    await tenant.save();

    const user = await User.findById(tenant.user);

    if (user) {
      user.status = "Suspended";
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Tenant rejected successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * GET ALL PENDING TENANTS
 */
const getPendingTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find({
      status: "Pending",
    }).populate("user");

    res.status(200).json(tenants);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  approveTenant,
  rejectTenant,
  getPendingTenants,
};