require("dotenv").config();
require("./utils/cronjob");
const express = require("express");
var cors = require("cors");
const connectDB = require("./config/databse");
const app = express();
const cookieParser = require("cookie-parser");
const http = require("http");
const initializeSocket = require("./utils/socket");

app.use(
  cors({
    origin: "http://localhost:5173", //whitelisting domain name
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection established");
    server.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connot be connected!!", err);
  });
