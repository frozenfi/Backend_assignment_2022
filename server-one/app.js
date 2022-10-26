const express = require("express");
const app = express();

//Middle ware
const morgan = require("morgan");
//const logger = require("./logger");

app.use(morgan("tiny"));
app.use(express.static("./public"));

const PORT = 3001;
// app.get("/", (req, res) => {
//   res.send("Hello app using express");
// });
app.get("/catinfo", (req, res) => {
  const cat = {
    name: "Frank Cat",
    birthdate: "2021-12-03",
    weight: 19,
  };
  res.json(cat);
});
app.get("/test", (req, res) => {
  reqCounter++;
});

app.get("/about", (req, res) => {
  res.status(200).res.send("public/index.html");
});

app.listen(PORT, () => {
  console.log(`The app is listening in the port ${PORT}`);
});
