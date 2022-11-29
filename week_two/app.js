"use strict";
const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

const catRoute = require("./routes/catRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const passport = require("./utils/passport");

const PORT = 3000;

app.use(express.static("uploads"));
app.use("/thumbnails", express.static("thumbnails"));
app.use(cors());

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/auth", authRoute);
app.use("/cat", passport.authenticate("jwt", { session: false }), catRoute);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);

app.listen(PORT, () => {
  console.log("Server is runnining in port", PORT);
});
