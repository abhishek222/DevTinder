const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        // called only when new data is inserted.
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://images.app.goo.gl/wss5kfZwK4PEBDEv9",
    },
    about: {
      type: String,
      default: "This is default data",
    },
    skills: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length >= 2 && val.length <= 5; // Ensuring between 2 and 5 elements
        },
        message: "Array must have between 2 and 5 items.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
