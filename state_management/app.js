"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/getCookie", (req, res) => {
  console.log(req.cookies);
  res.send("Your color choice was: " + req.cookies.color);
});
app.get("/deleteCookie", (req, res) => {
  res.clearCookie("color");
  res.send("Color cookie deleted");
});

app.get("/setCookie/:color", (req, res) => {
  console.log(req.params.color);
  res.cookie("color", req.params.color);
  res.send("cookie set.");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
