"use strict";
const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");

const getUsers = async (req, res) => {
  const users = await userModel.getAllUsers(res);
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await userModel.getUserById(req.params.id, res);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Errorr!!");
  }
};

const createUser = async (req, res) => {
  console.log("Creating a new user:", req.body);

  const newUser = req.body;
  if (!newUser.role) {
    //default value for user role
    newUser.role = 1;
  }
  const errors = validationResult(req);
  console.log("validation error", errors);

  if (errors.isEmpty()) {
    const result = await userModel.addUser(newUser, res);
    res.status(201).json({ message: "user created", userId: result });
  } else {
    res.status(400).json({
      message: "user creation failed",
      errors: errors.array(),
    });
  }
};

const modifyUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  if (req.params.userId) {
    user.id = req.params.userId;
  }
  const result = await userModel.updateUserById(user, res);
  console.log(result);
  if (result.affectedRows > 0) {
    res.send("User modified!!");
  } else {
    res.sendStatus(502);
  }
};
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.deleteUserById(res, userId);

  if (!user) {
    res.send("User deleted successfully");
  } else res.status(404).send(`Error!! deleting user!!`);
};

module.exports = {
  getUser,
  getUsers,
  modifyUser,
  createUser,
  deleteUser,
};
