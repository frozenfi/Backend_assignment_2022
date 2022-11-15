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
  const cat = req.body;
  cat.filename = req.file.filename;
  console.log("creating a new cat:", cat);
  //const catId = await catModel.addCat(cat, res);
  //res.status(201).json({ catId });

  const errors = validationResult(req);
  console.log("validation error", errors);

  if (errors.isEmpty() && req.file) {
    const cat = req.body;
    cat.filename = req.file.filename;
    console.log("creating a new cat:", cat);
    const catId = await catModel.addCat(cat, res);
    res.status(201).json({ message: "Cat Created", catId });
  } else {
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
  const cat = await catModel.deleteCatById(res, catId);

  if (!cat) {
    res.send("cat deleted successfully");
  } else res.status(404).send(`Error!! deleting cat`);
};

module.exports = {
  getCats,
  deleteCatById,
  getCat,
  modifyCat,
  createCat,
};
