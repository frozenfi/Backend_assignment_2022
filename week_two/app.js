"use strict";
const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

const catRoute = require("./routes/catRoute");
const userRoute = require("./routes/userRoute");
const PORT = 3000;
app.use(cors());

app.use(express.static("uploads"));

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cat", catRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("Server is runnining in port", PORT);
});
