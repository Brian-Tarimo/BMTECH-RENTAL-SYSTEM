const Tenant = require("../models/Tenant");

const getTenantDashboard = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({
      user: req.user.id,
    }).populate("unit");

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    res.json({ tenant });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Unit = require("../models/Unit");

// GET VACANT UNITS
const getVacantUnits = async (req, res) => {
  try {
    const units = await Unit.find({ status: "Vacant" });

    res.status(200).json({
      success: true,
      units,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const UnitRequest = require("../models/UnitRequest");

const requestUnit = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({
      user: req.user.id,
    });

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    // CHECK IF TENANT ALREADY HAS PENDING REQUEST
    const existingRequest = await UnitRequest.findOne({
      tenant: tenant._id,
      status: "Pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You already have a pending unit request",
      });
    }

    const request = await UnitRequest.create({
      tenant: tenant._id,
      unit: req.body.unitId,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Unit request submitted successfully",
      request,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTenantDashboard,
  getVacantUnits,
  requestUnit,
};

