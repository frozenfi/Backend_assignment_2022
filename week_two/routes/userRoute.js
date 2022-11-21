"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const users = require("../controllers/userController");

router
  .route("/")
  .get(users.getUsers)
  .post(
    body("name").isLength({ min: 3 }).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("passwd").isLength({ min: 8 }).trim(),
    users.createUser
  );
router.put(
  "/:id",
  body("name").isLength({ min: 3 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("passwd").isLength({ min: 8 }).trim(),
  users.modifyUser
);

router.route("/:id").get(users.getUser).delete(users.deleteUser);

module.exports = router;
