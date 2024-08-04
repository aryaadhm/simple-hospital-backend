const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(process.env.DB_CONFIG);
};

module.exports = {
  connectDB,
};
