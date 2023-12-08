const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
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

app.use(todoRoutes);
app.use(userRoutes);

// Proteja as rotas do backend:

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;
