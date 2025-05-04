const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Login1 = require("../../models/Login1");

// =======================
// Register Route
// POST /api/Login1/register1
// =======================
Router.post("/register1", async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const user = await Login1.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    const newUser = new Login1({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    res.json(newUser);

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// =======================
// Login Route
// POST /api/Login1/login1
// =======================
Router.post("/login1", async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, password } = req.body;
    const user = await Login1.findOne({ email });

    if (!user) {
      return res.status(404).json({ emailNotFound: "Email is not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ passwordIncorrect: "Password incorrect" });
    }

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.SECRET_OR_KEY || "yoursecret",
      { expiresIn: "2y" },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      }
    );

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = Router;
