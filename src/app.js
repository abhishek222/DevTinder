const express = require("express");
const connectDB = require("./config/databse");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a new instance of user model
  const user = new User({
    firstName: "Tejashri",
    lastName: "Gadhave",
    emailId: "teju@gmain.com",
    password: "teju@1234",
  });
  try {
    await user.save();
    res.send("user added successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connot be connected!!");
  });
