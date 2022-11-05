// "Use strict";
//Cat Controller
const catModel = require("../models/catModel");

let cats = catModel.cats;

const getCats = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};
const getCat = async (req, res) => {
  const catId = req.params.id;
  const cat = await catModel.getCatById(res, catId);

  if (cat) {
    res.json(cat);
  } else res.status(404).send(`Error!!`);
};
const postCat = async (req, res) => {
  const body = req.body;
  const cat = await catModel.postCat(res, body);
  cat = {
    cat_id: body.id,
    name: body.name,
    birthdate: body.birthdate,
    weight: body.weight,
    owner: body.owner,
    filename: body.filename,
  };
  cats = cats.concat(cat);
  res.json(cat);
};

// const createCat = (req, res) => {
//   const body = req.body;
//   if (!body.name) {
//     return res.status(404).json({
//       error: "Content missing",
//     });
//   }
//   const cat = {
//     //id: body.id,
//     name: body.name,
//     birthdate: body.birthdate,
//     weight: body.weight,
//     owner: body.owner,
//     filename: body.filename,
//   };
//   cats = cats.concat(cat);
//   res.json(cat);
// };
const createCat = (req, res) => {
  console.log(req.body);
  res.send("adding cat");
};

const modifyCat = (req, res) => {
  const catId = Number(req.params.id);
  if (!catId) {
    res.status(404).send(`User with id ${catId} was not found`);
  }
  res.send("Edited");
};

const deleteCat = (req, res) => {
  const id = Number(req.params.id);
  cats = cats.filter((cat) => cat.id !== id);
  res.status(204).end();
  console.log("Cat deleted successfully!!");
};

module.exports = {
  getCats,
  deleteCat,
  getCat,
  modifyCat,
  createCat,
};
