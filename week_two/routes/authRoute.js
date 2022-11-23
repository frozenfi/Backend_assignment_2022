"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { login } = require("../controllers/authController");
const { createUser } = require("../controllers/userController");

router.post("/login", login);
router.post(
  "/register",
  body("name").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("passwd").isLength({ min: 8 }).not().isUppercase().trim(),
  createUser
);

module.exports = router;
