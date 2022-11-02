"use strict";
const express = require("express");
const router = express.Router();
const users = require("../controllers/userController");

router.get("/", users.user_list_get);
router.post("/", users.user_list_post);

router
  .route("/:id")
  .get(users.user_list_get_id)
  .put(users.user_list_put)
  .delete(users.user_list_delete);

module.exports = router;
