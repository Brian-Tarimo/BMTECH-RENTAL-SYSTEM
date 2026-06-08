const Payment = require("../models/Payment");
const Expense = require("../models/Expense");
const Unit = require("../models/Unit");

const getMonthlyRevenue = async () => {

    const payments = await Payment.find();
  
    let monthly = {};
  
    payments.forEach((p) => {
  
      const month = new Date(p.paymentDate)
        .getMonth();
  
      monthly[month] =
        (monthly[month] || 0) + p.amount;
  
    });
  
    return monthly;
  };

  const forecastRevenue = async () => {

    const monthlyRevenue =
      await getMonthlyRevenue();
  
    const values =
      Object.values(monthlyRevenue);
  
    if (values.length < 2) {
      return {
        forecast: values[0] || 0,
        note:
          "Not enough data for prediction",
      };
    }
  
    let growthRates = [];
  
    for (
      let i = 1;
      i < values.length;
      i++
    ) {
      let growth =
        (values[i] - values[i - 1]) /
        values[i - 1];
  
      growthRates.push(growth);
    }
  
    const avgGrowth =
      growthRates.reduce(
        (a, b) => a + b,
        0
      ) / growthRates.length;
  
    const lastMonth =
      values[values.length - 1];
  
    const forecast =
      lastMonth * (1 + avgGrowth);
  
    return {
      forecastRevenue: forecast,
      avgGrowthRate: avgGrowth,
    };
  };

  const forecastExpenses = async () => {

    const expenses =
      await Expense.find();
  
    let monthly = {};
  
    expenses.forEach((e) => {
  
      const month = new Date(e.date)
        .getMonth();
  
      monthly[month] =
        (monthly[month] || 0) + e.amount;
  
    });
  
    const values =
      Object.values(monthly);
  
    if (values.length < 2) {
      return {
        forecast: values[0] || 0,
      };
    }
  
    let growthRates = [];
  
    for (
      let i = 1;
      i < values.length;
      i++
    ) {
  
      growthRates.push(
        (values[i] -
          values[i - 1]) /
          values[i - 1]
      );
  
    }
  
    const avgGrowth =
      growthRates.reduce(
        (a, b) => a + b,
        0
      ) / growthRates.length;
  
    const forecast =
      values[values.length - 1] *
      (1 + avgGrowth);
  
    return {
      forecastExpenses: forecast,
    };
  };

  const forecastOccupancy = async () => {

    const units = await Unit.find();
  
    const occupied = units.filter(
      (u) => u.status === "Occupied"
    ).length;
  
    const occupancyRate =
      (occupied / units.length) * 100;
  
    // SIMPLE TREND ASSUMPTION
    const forecast =
      occupancyRate > 80
        ? occupancyRate + 2
        : occupancyRate - 3;
  
    return {
      currentOccupancy: occupancyRate,
      forecastOccupancy: forecast,
    };
  };

  const getForecasts = async () => {

    const revenue =
      await forecastRevenue();
  
    const expenses =
      await forecastExpenses();
  
    const occupancy =
      await forecastOccupancy();
  
    const profitForecast =
      revenue.forecastRevenue -
      expenses.forecastExpenses;
  
    return {
      revenue,
      expenses,
      occupancy,
      profitForecast,
    };
  };
  
  module.exports = {
    getForecasts,
  };