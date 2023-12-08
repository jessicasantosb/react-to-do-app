const { Router } = require("express");
const { login, register } = require("../controllers/userController");

const user = Router();

user.post("/register", register);
user.post("/login", login);

module.exports = user;
