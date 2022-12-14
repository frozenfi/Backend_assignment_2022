"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { login, logout, register } = require("../controllers/authController");

router.post("/login", login);
router.get("/logout", logout);
router.post(
  "/register",
  body("name").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("passwd").isLength({ min: 8 }).not().isUppercase().trim(),
  register
);

module.exports = router;
