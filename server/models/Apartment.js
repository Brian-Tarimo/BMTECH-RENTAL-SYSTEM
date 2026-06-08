const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    totalUnits: {
      type: Number,
      default: 0,
    },

    occupiedUnits: {
      type: Number,
      default: 0,
    },

    vacantUnits: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Apartment",
  apartmentSchema
);