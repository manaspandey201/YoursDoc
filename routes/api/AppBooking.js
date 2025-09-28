const express = require("express");
const AppBooking = require("../../models/AppBooking");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Save appointment
router.post(
  "/",
  [
    body("title").notEmpty().trim().isLength({ max: 255 }),
    body("pname").notEmpty().trim().isLength({ max: 255 }),
    body("mobile").notEmpty().trim().isMobilePhone(),
    body("date").isISO8601(),
    body("email").notEmpty().trim().isEmail(),
    body("nicpass").notEmpty().trim().isLength({ min: 12, max: 12 }).isNumeric(),
    body("area").notEmpty().trim().isLength({ max: 255 }),
  ],
  validate,
  async (req, res) => {
    try {
      const newPost = new AppBooking(req.body);
      await newPost.save();
      res.status(200).json({ success: "Appointment booked successfully." });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error. Failed to save appointment." });
    }
  }
);

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const posts = await AppBooking.find();
    res.status(200).json({ success: true, existingPosts: posts });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error. Failed to fetch appointments." });
  }
});

// Get one appointment
router.get("/:id", async (req, res) => {
  try {
    const post = await AppBooking.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Appointment not found." });
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error. Failed to fetch appointment." });
  }
});

// Update appointment
router.put("/:id",
  [
    body("title").notEmpty().trim().isLength({ max: 255 }),
    body("pname").notEmpty().trim().isLength({ max: 255 }),
    body("mobile").notEmpty().trim().isMobilePhone(),
    body("date").isISO8601(),
    body("email").notEmpty().trim().isEmail(),
    body("nicpass").notEmpty().trim().isLength({ min: 12, max: 12 }).isNumeric(),
    body("area").notEmpty().trim().isLength({ max: 255 }),
  ],
  validate,
  async (req, res) => {
    try {
      const post = await AppBooking.findByIdAndUpdate(req.params.id, { $set: req.body });
      if (!post) return res.status(404).json({ error: "Appointment not found." });
      res.status(200).json({ success: "Appointment updated successfully." });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error. Failed to update appointment." });
    }
  }
);

// Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await AppBooking.findByIdAndRemove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Appointment not found." });
    res.status(200).json({ success: "Appointment deleted successfully.", deleted });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error. Failed to delete appointment." });
  }
});

module.exports = router;
