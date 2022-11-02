"use strict";
const userModel = require("../models/userModel");
let users = userModel.users;

const user_list_get = (req, res) => {
  users.map((user) => {
    delete user.password;
    return user;
  });

  res.json(users);
};

const user_list_get_id = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
    res.json(user);
  } else res.status(404).send(`Error getting data of user having id: ${id}`);
};

const user_list_post = (req, res) => {
  const body = req.body;
  if (!body.name || !body.email) {
    res.status(404).end("Error adding users!!");
    console.log(body.name);
  }
  const user = {
    name: body.name,
    email: body.email,
    password: body.password,
    id: body.id,
  };
  users = users.concat(user);
  res.json(`Username: ${user.name}, email: ${user.email}`);
  console.log(user.name);
};

const user_list_put = (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(404).send(`User with id ${id} was not found`);
  }
  res.send("Edited successfullly");
};

const user_list_delete = (req, res) => {
  const id = Number(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.status(404).end();
  console.log("Delete successful!!");
};

module.exports = {
  user_list_get,
  user_list_get_id,
  user_list_post,
  user_list_put,
  user_list_delete,
};
