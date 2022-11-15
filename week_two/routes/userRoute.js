"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const users = require("../controllers/userController");

router
  .route("/")
  .get(users.getUsers)
  .post(
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("passwd").isLength({ min: 8 }),
    users.createUser
  );

router
  .route("/:id")
  .get(users.getUser)
  .put(users.modifyUser)
  .delete(users.deleteUser);

module.exports = router;
