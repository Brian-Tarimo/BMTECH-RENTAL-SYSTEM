const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");
const Expense = require("../models/Expense");
const Unit = require("../models/Unit");

const generateInsights = async () => {

    const invoices = await Invoice.find();
    const payments = await Payment.find();
    const expenses = await Expense.find();
    const units = await Unit.find();
  
    // TOTAL REVENUE
    const revenue = payments.reduce(
      (acc, p) => acc + p.amount,
      0
    );
  
    // TOTAL EXPENSES
    const totalExpenses = expenses.reduce(
      (acc, e) => acc + e.amount,
      0
    );
  
    // PROFIT
    const profit = revenue - totalExpenses;
  
    // OCCUPANCY RATE
    const occupied = units.filter(
      (u) => u.status === "Occupied"
    ).length;
  
    const occupancyRate =
      (occupied / units.length) * 100;
  
    // INSIGHTS ARRAY
    let insights = [];
  
    // RULE 1 — PROFIT ANALYSIS
    if (profit > 0) {
      insights.push({
        type: "Positive",
        message:
          "Business is profitable this month",
      });
    } else {
      insights.push({
        type: "Warning",
        message:
          "Business is running at a loss",
      });
    }
  
    // RULE 2 — HIGH EXPENSE WARNING
    if (totalExpenses > revenue * 0.7) {
      insights.push({
        type: "Alert",
        message:
          "Expenses are too high compared to revenue",
      });
    }
  
    // RULE 3 — OCCUPANCY ALERT
    if (occupancyRate < 70) {
      insights.push({
        type: "Warning",
        message:
          "Low occupancy rate detected",
      });
    }
  
    // RULE 4 — GOOD OCCUPANCY
    if (occupancyRate >= 90) {
      insights.push({
        type: "Positive",
        message:
          "Excellent occupancy rate",
      });
    }
  
    return {
      revenue,
      totalExpenses,
      profit,
      occupancyRate,
      insights,
    };
  };
  
  module.exports = {
    generateInsights,
  };