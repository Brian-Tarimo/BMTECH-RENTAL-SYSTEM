const UnitRequest = require("../models/UnitRequest");
const Tenant = require("../models/Tenant");
const Unit = require("../models/Unit");

/* GET ALL REQUESTS (ADMIN) */
const getAllUnitRequests = async (req, res) => {
  try {
    const requests = await UnitRequest.find()
      .populate("tenant")
      .populate("unit");

    res.json({ requests });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* APPROVE REQUEST */
const approveUnitRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await UnitRequest.findById(id)
      .populate("tenant")
      .populate("unit");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    // 1. Assign unit to tenant
    await Tenant.findByIdAndUpdate(request.tenant._id, {
      unit: request.unit._id,
      status: "Active",
    });

    // 2. Mark unit as occupied
    await Unit.findByIdAndUpdate(request.unit._id, {
      status: "Occupied",
    });

    // 3. Update request
    request.status = "Approved";
    await request.save();

    res.json({
      success: true,
      message: "Unit approved successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* REJECT REQUEST */
const rejectUnitRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await UnitRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = "Rejected";
    await request.save();

    res.json({
      success: true,
      message: "Request rejected",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUnitRequests,
  approveUnitRequest,
  rejectUnitRequest,
};