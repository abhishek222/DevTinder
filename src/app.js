const express = require("express");
const app = express(); //  instance of server

// this will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Abhi", lastName: "Gadhave" }); // sending response to client
});
app.post("/user", (req, res) => {
  res.send("Data successfully sent to DB");
});
app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});

// this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello, from server!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
