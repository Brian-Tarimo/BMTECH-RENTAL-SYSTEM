const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    phone: {
      type: String,
    },

    type: {
      type: String,
      enum: ["Rent", "Deposit", "Other"],
      default: "Rent",
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    month: {
      type: String, // e.g. "2026-01"
    },

    checkoutRequestID: {
      type: String,
    },

    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);