const express = require("express");
const { apiRoute, apiProtected } = require("./routes/api.js");
const Auth = require("./middleware/auth.js");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/", apiRoute);
app.use("/api/", Auth, apiProtected);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
