const mongoose = require("mongoose");

const automationSchema = new mongoose.Schema({
  task: String,
  status: String,
  executedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "AutomationLog",
  automationSchema
);