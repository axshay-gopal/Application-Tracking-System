// requiring dependencies
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

// Import User model
const User = mongoose.model.userSchema;

// import bcrypt
const bcrypt = require("bcrypt");
router.post("/register", async (req, res) => {
  /// extracting email
  const email = req.body.email;
  const passowrd = req.body.password;
});
