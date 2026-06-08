const Invoice = require("../models/Invoice");

const Unit = require("../models/Unit");

const Tenant = require("../models/Tenant");

const Payment = require("../models/Payment");

const Expense = require("../models/Expense");

const dashboardAnalytics = async (
  req,
  res
) => {
  try {

    // TOTAL REVENUE

    const payments =
      await Payment.find();

    const totalRevenue =
      payments.reduce(
        (acc, payment) =>
          acc + payment.amount,
        0
      );

    // PENDING BALANCES

    const invoices =
      await Invoice.find();

    const pendingBalances =
      invoices.reduce(
        (acc, invoice) =>
          acc + invoice.balance,
        0
      );

    // UNITS

    const occupiedUnits =
      await Unit.countDocuments({
        status: "Occupied",
      });

    const vacantUnits =
      await Unit.countDocuments({
        status: "Vacant",
      });

    // TENANTS

    const totalTenants =
      await Tenant.countDocuments({
        status: "Active",
      });

    // MONTHLY PAYMENTS

    const monthlyPayments =
      payments.filter((payment) => {

        const paymentMonth =
          new Date(
            payment.paymentDate
          ).getMonth();

        const currentMonth =
          new Date().getMonth();

        return (
          paymentMonth === currentMonth
        );

      });

      //Expense

    const monthlyRevenue =
      monthlyPayments.reduce(
        (acc, payment) =>
          acc + payment.amount,
        0
      );

      const expenses =
  await Expense.find();

const totalExpenses =
  expenses.reduce(
    (acc, expense) =>
      acc + expense.amount,
    0
  );

const profitLoss =
  totalRevenue - totalExpenses;

  

    // PAYMENT STATUS ANALYTICS

    const paidInvoices =
      await Invoice.countDocuments({
        status: "Paid",
      });

    const partialInvoices =
      await Invoice.countDocuments({
        status: "Partial",
      });

    const pendingInvoices =
      await Invoice.countDocuments({
        status: "Pending",
      });

      res.status(200).json({

        totalRevenue,
      
        pendingBalances,
      
        occupiedUnits,
      
        vacantUnits,
      
        totalTenants,
      
        monthlyRevenue,
      
        totalExpenses,   // ✅ ADD HERE
      
        profitLoss,      // ✅ ADD HERE
      
        paymentAnalytics: {
      
          paidInvoices,
      
          partialInvoices,
      
          pendingInvoices,
      
        },
      
      });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  dashboardAnalytics,
};

