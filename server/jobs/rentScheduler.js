const cron = require("node-cron");
const Payment = require("../models/Payment");
const Tenant = require("../models/Tenant");

cron.schedule("0 0 1 * *", async () => {
  try {
    const tenants = await Tenant.find({ status: "Active" });

    for (let t of tenants) {
      await Payment.create({
        tenant: t._id,
        amount: t.monthlyRent,
        type: "Rent",
        status: "Pending",
        month: new Date().toISOString().slice(0, 7),
      });
    }

    console.log("Monthly rent generated");
  } catch (err) {
    console.log(err.message);
  }
});