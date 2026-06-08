const User = require("../models/User");
const Tenant = require("../models/Tenant");

// GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS (Active / Suspended / Pending)
const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = req.body.status;
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// APPROVE USER
const approveTenant = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "Active";
    await user.save();

    await Tenant.findOneAndUpdate(
      { user: user._id },
      { status: "Active" }
    );

    res.json({ message: "Tenant approved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { approveTenant };

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  updateUserStatus,
  approveTenant,
  deleteUser,
};