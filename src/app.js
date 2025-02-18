const express = require("express");
const connectDB = require("./config/databse");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    //creating new instance of the user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user added successfully!");
  } catch (error) {
    res.status(400).send("ERROR : " + error);
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
// DELETE API
app.delete("/user", async (req, res) => {
  const userID = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userID });
    res.send("User deleted successfully!");
  } catch (error) {
    res.status(404).send("Something Went Wrong!");
  }
});

//update API
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User Updated Successfully!");
  } catch (error) {
    res.status(400).send("Something went wrong!" + error);
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
