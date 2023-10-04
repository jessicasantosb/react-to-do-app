const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfuly connected to MongoDB.");
    })
    .catch((err) => {
      console.error(err);
      console.log("Unable to connect to MongoDB.");
    });
};

module.exports = dbConnect;
