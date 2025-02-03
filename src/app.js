const express = require("express");
const app = express(); //  instance of server

app.use("/test", (req, res) => {
  res.send("Hello, world!");
});
app.use("/hello", (req, res) => {
  res.send("Hello, Hello!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
