const express = require("express");

const requestsRouter = express.Router();
const { userAuth } = require("../middleware/auth");

requestsRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  res.send("Request sent for connection!!");
});

module.exports = requestsRouter;
