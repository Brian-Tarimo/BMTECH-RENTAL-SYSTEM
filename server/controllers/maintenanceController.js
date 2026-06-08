const Maintenance = require("../models/Maintenance");

// CREATE REQUEST (Tenant submits issue)
const createRequest = async (
  req,
  res
) => {
  try {

    const image =
      req.file
        ? req.file.path
        : "";

    const request =
      await Maintenance.create({

        ...req.body,

        image,

      });

    res.status(201).json(request);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET ALL REQUESTS
const getRequests = async (req, res) => {
  try {
    const requests = await Maintenance.find()
      .populate("tenant")
      .populate("unit")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE STATUS / ASSIGN TECHNICIAN
const updateRequest = async (req, res) => {
  try {
    const request = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(request);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE REQUEST
const deleteRequest = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Request deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest,
};

