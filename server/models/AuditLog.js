const mongoose =
  require("mongoose");

const auditSchema =
  new mongoose.Schema({

    user: String,

    role: String,

    action: String,

    timestamp: {

      type: Date,

      default:
        Date.now,

    },

  });

module.exports =
  mongoose.model(
    "AuditLog",
    auditSchema
  );