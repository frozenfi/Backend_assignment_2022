"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    const sql = "SELECT user_id, name, email, role FROM wop_user";
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const getUserById = async (id, res) => {
  try {
    const sql =
      "SELECT user_id, name, email, role FROM wop_user " +
      "WHERE user_id=" +
      id;
    const [rows] = await promisePool.query(sql);
    return rows[0];
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const addUser = async (user, res) => {
  try {
    const { name, email, passwd, role } = user;
    const sql = "INSERT INTO wop_user VALUES (null, ?, ?, ?, ?)";
    const values = [name, email, passwd, role];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const updateUserById = async (user, res) => {
  try {
    console.log("Modify user:", user);
    const sql =
      "UPDATE wop_user SET name = ?, email = ?, password = ?, role = ? WHERE user_id = ? ";
    const values = [user.name, user.email, user.password, user.role, user.id];
    const [result] = await promisePool.query(sql, values);
    return result;
  } catch (e) {
    res.status(501).send(e.message);
  }
};
const deleteUserById = async (res, userId) => {
  try {
    const [rows] = await promisePool.query(
      "DELETE FROM wop_user WHERE user_id = ?",
      [userId]
    );
    return rows[0];
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
};
