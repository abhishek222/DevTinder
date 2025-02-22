const express = require("express");

const requestsRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatuses = ["interested", "ignored"];
      if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status value: " + status);
      }
      // if there is already a request from this user to this user
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        throw new Error("Request already exists");
      }

      // check toUserIds are exist
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found");
      }
      const messages = {
        interested: `${req.user.firstName} is interested in ${toUser.firstName}`,
        ignored: `${req.user.firstName} has ignored request from ${toUser.firstName}`,
      };

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: messages[status],
        data,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = requestsRouter;
