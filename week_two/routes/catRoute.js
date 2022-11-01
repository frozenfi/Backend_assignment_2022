"use strict";
const express = require("express");
const router = express.Router();
const catController = require("../controllers/catController");

router.get("/", catController.cat_list_get);
router.post("/", catController.cat_list_post);

router
  .route("/:id")
  .get(catController.cat_list_get_id)
  .put(catController.cat_list_put)
  .delete(catController.cat_list_delete);

module.exports = router;
