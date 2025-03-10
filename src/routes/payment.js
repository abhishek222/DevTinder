const express = require("express");
const { userAuth } = require("../middleware/auth");
const paymentRouter = express.Router();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    res.status(200).send("Payment created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = paymentRouter;
