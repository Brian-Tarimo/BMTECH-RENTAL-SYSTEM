const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Rent",
        "Payment",
        "Maintenance",
        "System",
      ],
      default: "System",
    },

    recipientRole: {
      type: String,
      enum: [
        "Admin",
        "Landlord",
        "Caretaker",
        "Tenant",
        "All",
      ],
      default: "All",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);