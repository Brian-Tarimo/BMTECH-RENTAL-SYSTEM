const Unit = require("../models/Unit");

const createUnit = async (req, res) => {
  try {

    const unit = await Unit.create(req.body);

    res.status(201).json(unit);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getUnits = async (req, res) => {
  try {

    const units = await Unit.find()
      .populate("apartment");

    res.status(200).json(units);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateUnit = async (req, res) => {
  try {

    const unit =
      await Unit.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(unit);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteUnit = async (req, res) => {
  try {

    await Unit.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Unit deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createUnit,
  getUnits,
  updateUnit,
  deleteUnit,
};