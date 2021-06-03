const mongoose = require("mongoose");
require('dotenv').config({ encoding: 'latin1' })

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host} & port is ${conn.connection.port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
module.exports = connectDB;