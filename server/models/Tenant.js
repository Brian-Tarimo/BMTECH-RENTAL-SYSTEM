const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema(
  {
    // 🔥 LINK TO USER (CRITICAL FIX)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: String,

    email: {
      type: String,
      required: true,
    },

    phone: String,

    nationalId: String,

    status: {
      type: String,
      enum: ["Active", "Pending", "Suspended", "Rejected"],
      default: "Pending",
    },

    role: {
      type: String,
      default: "Tenant",
    },

    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
    },

    rentBalance: {
      type: Number,
      default: 0,
    },

    monthlyRent: {
      type: Number,
      default: 0,
    },

    leaseStart: Date,
    leaseEnd: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tenant", tenantSchema);