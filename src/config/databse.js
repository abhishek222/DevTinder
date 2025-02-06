const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://abhishekgadhave222:IWDCvaE7IG0BfZVj@namastenode.llf0l.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
