const Payment = require("../models/Payment");
const { stkPush } = require("../services/mpesaService");
const Tenant = require("../models/Tenant");

/* =========================
   INITIATE PAYMENT
========================= */
const initiatePayment = async (req, res) => {
  try {
    const { phone, amount, type } = req.body;

    const tenant = await Tenant.findOne({ user: req.user.id });

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const response = await stkPush(phone, amount);

    const payment = await Payment.create({
      tenant: tenant._id,
      amount,
      phone,
      type: type || "Rent", // 🔥 Deposit or Rent
      status: "Pending",
      month: new Date().toISOString().slice(0, 7), // YYYY-MM
      checkoutRequestID: response.CheckoutRequestID,
    });

    return res.json({
      success: true,
      message: "STK Push sent",
      payment,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================
   PAYMENT HISTORY
========================= */
const getPaymentHistory = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ user: req.user.id });

    if (!tenant) {
      return res.status(404).json({
        message: "Tenant not found",
      });
    }

    const payments = await Payment.find({
      tenant: tenant._id,
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      payments,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   EXPORTS
========================= */
module.exports = {
  initiatePayment,
  getPaymentHistory,
};