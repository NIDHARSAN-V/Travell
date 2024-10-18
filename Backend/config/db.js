
const dotenv = require('dotenv')
dotenv.config();

const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/AABBCC");
    console.log(`Mongodb connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`);
  }
};

module.exports = connectDB;