// server/db.js
const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI  || "mongodb://localhost:27017/task", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected ✅');
  } catch (error) {
    console.error('MongoDB connection failed ❌', error);
    process.exit(1);
  }
};

module.exports = connectDB;
