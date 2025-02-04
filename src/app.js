const express = require("express");
const app = express(); //  instance of server

// this will only handle GET call to /user
app.get("/user", (req, res) => {
  console.log(req.query); //{ userId: '23' }
  res.send({ firstName: "Abhi", lastName: "Gadhave" }); // sending response to client
});

app.get("/user/:userId/:name/:password", (req, res) => {
  // Dynamic routes
  console.log(req.params); //{ userId: '777', name: 'abhi', password: 'pwd' }
  res.send({ firstName: "Abhi", lastName: "Gadhave" }); // sending response to client
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
