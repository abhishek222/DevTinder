const express = require("express");
const { userAuth } = require("../middleware/auth");
const chatRouter = express.Router();
const Chat = require("../models/chat");

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const currentUserId = req.user._id;
    const existingChat = await Chat.findOne({
      participants: { $all: [currentUserId, targetUserId] },
    }).populate({
      path: "messages.sender",
      select: "firstName lastName photoUrl",
    });
    if (!existingChat) {
      const newChat = await Chat.create({
        participants: [currentUserId, targetUserId],
        messages: [],
      });
      await newChat.save();
    }

    res.send(existingChat);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = chatRouter;
