const express = require("express");

const requestsRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

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
      // send email to user
      const emailRes = await sendEmail.run(
        `You got new Friend Request from ${req.user.firstName}`,
        {
          to: toUser.emailId,
          subject: "New Friend Request",
          text: `${req.user.firstName} is interested in ${toUser.firstName}`,
        },
        toUser.emailId
      );
      res.json({
        message: messages[status],
        data,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

requestsRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const allowedStatuses = ["accepted", "rejected"];
      const { status, requestId } = req.params;
      if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status value: " + status);
      }
      if (!requestId) {
        throw new Error("Request ID is required");
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested",
      });
      if (!connectionRequest) {
        throw new Error("Request not found");
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: `Request ${status} successfully`,
        data,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = requestsRouter;
