"use strict";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const catController = require("../controllers/catController");

const uploads = multer({ dest: "../uploads" });
router.get("/", uploads.single("cat"), catController.cat_list_get);
router.post("/", catController.cat_list_get);

router
  .route("/:id")
  .get(catController.cat_list_get_id)
  .put(catController.cat_list_put)
  .delete(catController.cat_list_delete);

module.exports = router;
