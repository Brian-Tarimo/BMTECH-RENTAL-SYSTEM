const Apartment = require("../models/Apartment");

const createApartment = async (req, res) => {
  try {

    const apartment = await Apartment.create(req.body);

    res.status(201).json(apartment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getApartments = async (req, res) => {
  try {

    const apartments = await Apartment.find();

    res.status(200).json(apartments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateApartment = async (req, res) => {
  try {

    const apartment =
      await Apartment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(apartment);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteApartment = async (req, res) => {
  try {

    await Apartment.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Apartment deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createApartment,
  getApartments,
  updateApartment,
  deleteApartment,
};