const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const routes = require("./routes/todoRoute");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConnect()
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;