const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema(
  {
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
    },

    unitNumber: {
      type: String,
      required: true,
    },

    floor: {
      type: String,
    },

    type: {
      type: String,
      enum: [
        "Bedsitter",
        "Studio",
        "1BR",
        "2BR",
        "3BR",
      ],
      required: true,
    },

    monthlyRent: {
      type: Number,
      required: true,
    },

    deposit: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Vacant",
        "Occupied",
        "Reserved",
        "Maintenance",
      ],
      default: "Vacant",
    },

    tenantAssigned: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Unit",
  unitSchema
);