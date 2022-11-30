"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCats = async (res) => {
  try {
    const sql =
      "SELECT cat_id, wop_cat.name, weight,owner, filename, birthdate, wop_user.name AS ownername " +
      "FROM wop_cat JOIN wop_user ON wop_cat.owner = wop_user.user_id";
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
    const { name, weight, owner, filename, birthdate, coords } = cat;
    const sql = "INSERT INTO wop_cat VALUES (null, ?, ?, ?, ?, ?,?)";
    const values = [name, weight, owner, filename, birthdate, coords];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deleteCatById = async (res, owner, catId) => {
  const [user] = await promisePool.query(
    `SELECT role from wop_user WHERE user_id = ?`,
    [owner]
  );
  const user_role = user[0].role;
  console.log("User role is: ", user_role);
  try {
    if (user_role === 0) {
      const [rows] = await promisePool.execute(
        "DELETE FROM wop_cat WHERE cat_id = ?",
        [catId]
      );
      return rows[0];
    } else {
      const [rows] = await promisePool.query(
        "DELETE FROM wop_cat WHERE cat_id = ? AND owner = ?",
        [catId, owner]
      );
      return rows[0];
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const updateCatById = async (cat, res) => {
  try {
    const [user] = await promisePool.query(
      `SELECT role from wop_user WHERE user_id = ?`,
      [cat.owner]
    );
    const user_role = user[0].role;
    console.log("User role is: ", user_role);

    // user_role "0" is for the admin
    if (user_role == 0) {
      const sql =
        "UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? " +
        "WHERE cat_id = ?";
      const values = [cat.name, cat.weight, cat.owner, cat.birthdate, cat.id];
      console.log(values);
      const [rows] = await promisePool.query(sql, values);
      console.log(rows.affectedRows);
      return rows;
    } else {
      const sql =
        "UPDATE wop_cat SET name = ?, weight = ?, birthdate = ? " +
        "WHERE cat_id = ? AND owner = ?";
      const values = [cat.name, cat.weight, cat.birthdate, cat.id, cat.owner];
      console.log(values);
      const [rows] = await promisePool.query(sql, values);
      console.log(rows.affectedRows);
      return rows;
    }
    console.log("Modify cat:", cat);
  } catch (e) {
    console.error("error", e.message);
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getAllCats,
  getCatById,
  addCat,
  deleteCatById,
  updateCatById,
};
