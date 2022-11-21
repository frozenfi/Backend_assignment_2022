"use strict";
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { body } = require("express-validator");
const catController = require("../controllers/catController");

const fileFilter = (req, file, cb) => {
  const acceptedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (acceptedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  console.log(file);
};

const upload = multer({ dest: "uploads/", fileFilter });
router.get("/", catController.getCats);
router.post(
  "/",
  upload.single("cat"),
  body("name").isAlphanumeric().trim().escape(),
  body("birthdate").isDate(),
  body("owner").isInt({ min: 1 }),
  body("weight").isFloat({ min: 0.1, max: 30 }),
  catController.createCat
);
router.put(
  "/",
  body("name").isAlphanumeric().trim().escape(),
  body("birthdate").isDate(),
  body("owner").isInt({ min: 1 }),
  body("weight").isFloat({ min: 0.1, max: 30 }),

  catController.modifyCat
);
router.put(
  "/:id",
  body("name").isAlphanumeric().trim().escape(),
  body("birthdate").isDate(),
  body("owner").isInt({ min: 1 }),
  body("weight").isFloat({ min: 0.1, max: 30 }),
  catController.modifyCat
);

router
  .route("/:id")
  .get(catController.getCat)

  .delete(catController.deleteCatById);

module.exports = router;
