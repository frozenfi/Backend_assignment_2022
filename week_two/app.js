"use strict";
const express = require("express");
const app = express();
const morgan = require("morgan");
const catRoute = require("./routes/catRoute");
const userRoute = require("./routes/userRoute");
const PORT = 3001;
app.use(express.json());

app.use(morgan("tiny"));
app.use("/cat", catRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("Server is runnining in port", PORT);
});
