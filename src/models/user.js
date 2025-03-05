const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      index: true,
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address!");
        }
      },
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
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE}Invalid gender value`,
      },
      // validate(value) {
      //   // called only when new data is inserted.
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfVuGdiPJQRi4thppytG_8zWv9UgS0MCvgiQ&s",
    },
    about: {
      type: String,
      default: "This is default data",
    },
    skills: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length >= 0 && val.length <= 5; // Ensuring between 2 and 5 elements
        },
        message: "Array must have between 2 and 5 items.",
      },
    },
  },
  { timestamps: true },
  { strict: true }
);

userSchema.pre("save", function (next) {
  if (!this.photoUrl) {
    this.photoUrl =
      "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg";
  }
  next();
});

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
