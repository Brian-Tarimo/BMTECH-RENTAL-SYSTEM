const User = require("../models/User");
const Tenant = require("../models/Tenant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getTenantDashboard = require("../controllers/authController");

/* ==============================
   REGISTER USER (TENANT FLOW)
============================== */
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, nationalId } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. CREATE USER (PENDING)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Tenant",
      status: "Pending",
    });

    // 2. CREATE TENANT PROFILE (LINKED TO USER)
    await Tenant.create({
      user: user._id,
      fullName: name,
      email,
      phone,
      nationalId,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted. Await admin approval.",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* ==============================
   LOGIN USER
============================== */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // ❌ BLOCK UNAPPROVED USERS
    if (user.status !== "Active") {
      return res.status(403).json({
        message: "Account pending admin approval",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};