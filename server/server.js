const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/* ================= ROUTES ================= */
const authRoutes = require("./routes/authRoutes");
const apartmentRoutes = require("./routes/apartmentRoutes");
const unitRoutes = require("./routes/unitRoutes");
const tenantRoutes = require("./routes/tenantRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const insightsRoutes = require("./routes/insightsRoutes");
const forecastRoutes = require("./routes/forecastRoutes");
const tenantApprovalRoutes = require("./routes/tenantApprovalRoutes");
const userManagementRoutes = require("./routes/userManagementRoutes");
const statsRoutes = require("./routes/statsRoutes");
const unitRequestRoutes = require("./routes/unitRequestRoutes");

/* ================= ROUTE USAGE ================= */
app.use("/api/auth", authRoutes);
app.use("/api/apartments", apartmentRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/forecast", forecastRoutes);
app.use("/api/tenant-approval", tenantApprovalRoutes);
app.use("/api/user-management", userManagementRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/requests", unitRequestRoutes);
app.use("/api/unit-requests", require("./routes/unitRequestRoutes"));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("BMTECH API Running...");
});

/* ================= DATABASE ================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    /* ================= START SERVER ================= */
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

      /* ================= AUTOMATION (START HERE) ================= */
      const {
        runOverdueCheck,
        runDueReminders,
      } = require("./services/automationService");

      runOverdueCheck();
      runDueReminders();
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });