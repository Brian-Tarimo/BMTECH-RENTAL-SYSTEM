const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  try {

    const expense =
      await Expense.create(req.body);

    res.status(201).json(expense);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getExpenses = async (req, res) => {
  try {

    const expenses =
      await Expense.find().sort({
        createdAt: -1,
      });

    res.status(200).json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteExpense = async (req, res) => {
  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Expense deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
};