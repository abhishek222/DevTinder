const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middleware/auth");
// handle middleware for all request
app.use("/admin", adminAuth);
// app.use("/user", userAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

//Error Handling!!
app.get("/getUserData", userAuth, (req, res) => {
  try {
    //Logic of DB call and get user data
    throw new Error("asfaasfasas");
    res.send("User data sent!");
  } catch (error) {
    res.status(500).send("Something went wrong! Contact your administrator!");
  }
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user!");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    //Log your error
    res.status(500).send("Something Went wrong!"); // always use at last - order matters
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
