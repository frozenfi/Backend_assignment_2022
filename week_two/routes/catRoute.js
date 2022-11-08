"use strict";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const catController = require("../controllers/catController");

const upload = multer({ dest: "uploads/" });
router.get("/", catController.getCats);
router.post("/", upload.single("cat"), catController.createCat);
router.put("/", catController.modifyCat);

router
  .route("/:id")
  .get(catController.getCat)
  .delete(catController.deleteCatById);

module.exports = router;
