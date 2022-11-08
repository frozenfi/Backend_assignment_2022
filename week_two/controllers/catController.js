"use strict";
const { rawListeners } = require("../database/db");
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
  //const catData = req.body;
  //console.log(catData);
  const catModify = await catModel.modifyCat(res, req);
  if (!catModify) {
    res.send("cat modified");
  } else {
    res.sendStatus(502);
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
