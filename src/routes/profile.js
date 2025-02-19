const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateProfileEditData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const user = req.user;
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });
    await user.save();
    res.json({
      message: `${user.lastName}, your profile updated successfully`,
      data: user,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/updatePassword", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new Error("Invalid Old Password");
    }
    const isNewPasswordValid = validator.isStrongPassword(newPassword);
    if (!isNewPasswordValid) {
      throw new Error("New Password is not Strong password!!!");
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();
    res.json({
      message: `${user.lastName}, your password updated successfully`,
      data: user,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

module.exports = profileRouter;
