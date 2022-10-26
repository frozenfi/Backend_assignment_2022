"use strict";
const { application } = require("express");
const express = require("express");
const app = express();

//Middle ware
//const morgan = require("morgan");

//app.use(morgan("tiny"));

app.use(express.static("./public"));
app.set("view engine", "pug");

const PORT = 3001;
let reqCounter = 0;

app.get("/catinfo", (req, res) => {
  const cat = {
    name: "Frank Cat",
    birthdate: "2021-12-03",
    weight: 19,
  };
  res.json(cat);
});
app.get("/test", (req, res) => {
  console.log("This direct to the /test.");
  reqCounter++;

  //Use of pug to render the data
  res.render("test", {
    title: "Trial on PUG",
    header1: "This page tests PUG",
    header2: "Counter Value",
    exampleText: `Page requested ${reqCounter} times`,
  });
});

app.get("/about", (req, res) => {
  res.status(200).res.send("public/index.html");
});

app.listen(PORT, () => {
  console.log(`The app is listening in the port ${PORT}`);
});
