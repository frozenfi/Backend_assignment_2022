"use strict";
const catModel = require("../models/catModel");

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
  const catId = await catModel.addCat(cat, res);
  res.status(201).json({ catId });
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
