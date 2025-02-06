const express = require("express");
const connectDB = require("./config/databse");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user");
  }
});

// find user by emailId
app.get("/getUser", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // const user = await User.find({ emailId: userEmail });
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0) {
      res.status(400).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(404).send("user not found");
  }
});

// Feed API - GET /feed -get all users from database
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (user.length === 0) {
      res.status(400).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(404).send("user not found");
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
