const express = require("express");
const app = express();

app.use("/user", [
  (req, res, next) => {
    console.log("response got");
    next();
  },
  (req, res, next) => {
    console.log("2nd response");
    next();
  },
  (req, res, next) => {
    console.log("3rd response");
    next();
  },
  (req, res, next) => {
    console.log("4th response");
    next();
  },
  (req, res, next) => {
    console.log("5th response");
    res.send("5th response");
  },
]);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
