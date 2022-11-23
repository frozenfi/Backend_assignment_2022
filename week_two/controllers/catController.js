"use strict";
const catModel = require("../models/catModel");
const { validationResult } = require("express-validator");

//let cats = catModel.cats;

const getCats = async (req, res) => {
  const cats = await catModel.getAllCats(res);
  res.json(cats);
};
const getCat = async (req, res) => {
  const catId = req.params.id;
  const cat = await catModel.getCatById(res, catId);

  if (cat) {
    res.json(cat);
  } else res.status(404).send(`Error!!`);
};

const createCat = async (req, res) => {
  const errors = validationResult(req);

  if (!req.file) {
    res.status(404).json({ message: "file missing or invalid" });
  } else if (errors.isEmpty()) {
    const cat = req.body;
    //const userId = req.user.user_id;
    cat.filename = req.file.filename;
    cat.owner = req.user.user_id;
    console.log("creating a new cat:", cat);
    const catId = await catModel.addCat(cat, res);
    res.status(201).json({ message: "Cat Created", catId });
  } else {
    console.log("validation error", errors);
    res.status(400).json({
      message: "cat creation failed",
      errors: errors.array(),
    });
  }
};

const modifyCat = async (req, res) => {
  const cat = req.body;
  if (req.params.catId) {
    cat.id = req.params.catId;
  }
  const result = await catModel.updateCatById(cat, res);
  console.log(result);
  if (result.affectedRows > 0) {
    res.json({ message: "cat modified: " + cat.id });
  } else {
    res.status(404).json({ message: "nothing changed" });
  }
};

const deleteCatById = async (req, res) => {
  const catId = req.params.id;
  const cat = await catModel.deleteCatById(res, req.user.user_id, catId);

  if (!cat) {
    res.send("cat deleted successfully");
  } else res.status(404).json({ message: "Cat delete failed" });
};

module.exports = {
  getCats,
  deleteCatById,
  getCat,
  modifyCat,
  createCat,
};
