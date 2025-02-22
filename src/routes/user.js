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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // get all the requests (send/received)
    const requests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId status");

    const hideUsersFromFeeed = new Set();
    requests.forEach((request) => {
      hideUsersFromFeeed.add(request.fromUserId);
      hideUsersFromFeeed.add(request.toUserId);
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: [...hideUsersFromFeeed] } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(USER_POPULATE_DATA);

    res.json({ message: "Data fetched successfully", data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
