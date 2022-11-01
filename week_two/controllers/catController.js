// "Use strict";
//Cat Controller
const catModel = require("../models/catModel");

let cats = catModel.cats;

const cat_list_get = (req, res) => {
  res.json(cats);
};
const cat_list_get_id = (req, res) => {
  const id = Number(req.params.id);
  const cat = cats.find((cat) => cat.id === id);

  if (cat) {
    res.json(cat);
  } else res.status(404).send(`Error getting data of cat having id: ${id}`);
};

const cat_list_post = (req, res) => {
  const body = req.body;
  if (!body.name || !body.birthdate) {
    return res.status(404).json({
      error: "Content missing",
    });
  }
  const cat = {
    id: body.id,
    name: body.name,
    birthdate: body.birthdate,
    weight: body.weight,
    owner: body.owner,
    filename: body.filename,
  };
  cats = cats.concat(cat);
  res.json(cat);
};

const cat_list_put = (req, res) => {
  const catId = Number(req.params.id);
  if (!catId) {
    res.status(404).send(`User with id ${catId} was not found`);
  }
  res.send("Edited");
};

const cat_list_delete = (req, res) => {
  const id = Number(req.params.id);
  cats = cats.filter((cat) => cat.id !== id);
  res.status(204).end();
  console.log("Cat deleted successfully!!");
};

module.exports = {
  cat_list_get,
  cat_list_delete,
  cat_list_get_id,
  cat_list_post,
  cat_list_put,
};
