"use strict";
const express = require("express");
const router = express.Router();
const users = require("../controllers/userController");

router.route("/").get(users.getUsers).post(users.createUser);

router
  .route("/:id")
  .get(users.getUser)
  .put(users.modifyUser)
  .delete(users.deleteUser);

module.exports = router;
