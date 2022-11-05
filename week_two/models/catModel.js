"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM wop_cat");
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getCatById = async (res, catId) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT * FROM wop_cat WHERE cat_id = ?",
      [catId]
    );
    return rows[0];
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const postCat = async (res, data) => {
  try {
    const [rows] = await promisePool.query(
      "INSERT INTO wop_cat (cat_id,name,weight,owner,filename, birthdate) VALUES(?,?,?,?,?,?)",
      [
        data.user_id,
        data.name,
        data_weight,
        data.owner,
        data.filename,
        data.birthdate,
      ]
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllCats,
  getCatById,
  postCat,
};
