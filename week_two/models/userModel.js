"use strict";
// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@metropolia.fi",
//     password: "1234",
//   },
//   {
//     id: 2,
//     name: "Jane Doez",
//     email: "jane@metropolia.fi",
//     password: "qwer",
//   },
// ];
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT user_id,name,email,role FROM wop_user"
    );
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};
const getUserById = async (res, userId) => {
  try {
    const [rows] = await promisePool.query(
      "SELECT user_id,name,email  FROM wop_user WHERE user_id = ?",
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
};
