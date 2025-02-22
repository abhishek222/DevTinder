const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const USER_POPULATE_DATA =
  "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      // }).populate("fromUserId", ["firstName", "lastName"]);
    }).populate("fromUserId", USER_POPULATE_DATA);
    const data = requests.map((row) => row.fromUserId);

    res.json({ message: "Data fetched successfully", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_POPULATE_DATA)
      .populate("toUserId", USER_POPULATE_DATA);

    const data = requests.map((row) =>
      row.fromUserId._id.equals(loggedInUser._id)
        ? row.toUserId
        : row.fromUserId
    );
    res.json({ message: "Data fetched successfully", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
