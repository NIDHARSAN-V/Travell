
const dotenv = require('dotenv')
dotenv.config();

const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://nidharsanv22cse:vJhfFSPFYNcu6xso@cluster0.gmpzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`Mongodb connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`);
  }
};

module.exports = connectDB;