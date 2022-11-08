"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    const sql = "SELECT * FROM wop_cat";
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getCatById = async (res, catId) => {
  try {
    const sql = "SELECT * FROM wop_cat WHERE cat_id =" + [catId];
    const [rows] = await promisePool.query(sql);
    return rows[0];
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const addCat = async (cat, res) => {
  try {
    const { name, weight, owner, filename, birthdate } = cat;
    const sql = "INSERT INTO wop_cat VALUES (null, ?, ?, ?, ?, ?)";
    const values = [name, weight, owner, filename, birthdate];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deleteCatById = async (res, catId) => {
  try {
    const [rows] = await promisePool.query(
      "DELETE FROM wop_cat WHERE cat_id = ?",
      [catId]
    );
    return rows[0];
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const modifyCat = async (cat, res) => {
  try {
    const { name, weight, owner, birthdate, id } = cat;
    const sql = `UPDATE wop_cat SET name = "?", weight = ?, owner = ?, birthdate = "?" WHERE cat_id = ? `;
    const values = [name, weight, owner, birthdate, id];
    const [result] = await promisePool.query(sql, values);
    console.log(result.affectedRows);
    return result[0];
  } catch (e) {
    res.status(501).send(e.message);
  }
};

module.exports = {
  getAllCats,
  getCatById,
  addCat,
  deleteCatById,
  modifyCat,
};
