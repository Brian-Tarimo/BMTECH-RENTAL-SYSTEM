const Tenant = require("../models/Tenant");
const Unit = require("../models/Unit");
const Payment = require("../models/Payment"); // 🔥 IMPORTANT

/* =========================
   CREATE TENANT + ASSIGN UNIT
========================= */
const createTenant = async (req, res) => {
  try {
    const { unit, monthlyRent, deposit } = req.body;

    // 1. Create tenant
    const tenant = await Tenant.create({
      ...req.body,
      status: "Active",
    });

    // 2. Assign unit
    const assignedUnit = await Unit.findByIdAndUpdate(
      unit,
      {
        status: "Occupied",
        tenantAssigned: tenant.fullName,
      },
      { new: true }
    );

    if (!assignedUnit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    // 3. Attach unit to tenant
    tenant.unit = unit;
    tenant.monthlyRent = monthlyRent || assignedUnit.rent;
    await tenant.save();

    // 🔥 4. CREATE DEPOSIT PAYMENT AUTOMATICALLY
    await Payment.create({
      tenant: tenant._id,
      amount: deposit || 0,
      type: "Deposit",
      status: "Pending",
      month: new Date().toISOString().slice(0, 7),
    });

    return res.status(201).json({
      success: true,
      message: "Tenant created and unit assigned",
      tenant,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET ALL TENANTS
========================= */
const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find().populate("unit");
    return res.json(tenants);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================
   MOVE OUT TENANT (FIXED)
========================= */
const moveOutTenant = async (req, res) => {
  try {
    const tenantId = req.params.id; // 🔥 FIX (was req.user.id)

    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    tenant.status = "Moved Out";
    await tenant.save();

    // Free unit
    if (tenant.unit) {
      await Unit.findByIdAndUpdate(tenant.unit, {
        status: "Vacant",
        tenantAssigned: "",
      });
    }

    return res.json({
      success: true,
      message: "Tenant moved out successfully",
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTenant,
  getTenants,
  moveOutTenant,
};