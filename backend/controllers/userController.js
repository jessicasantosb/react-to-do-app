const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../db/userModel");

const register = async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User created successfuly",
            result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error creating user",
            err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Password was not hash successfuly",
        err,
      });
    });
};

const login = async (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((pwdCheck) => {
          if (!pwdCheck) {
            return res.status(400).send({
              message: "Password does not match",
            });
          }
          const token = jwt.sign(
            {
              userID: user._id,
              userUsername: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );
          res.status(200).send({
            message: "Login Successful",
            username: user.username,
            token,
          });
        })
        .catch((err) => {
          res.status(400).send({
            message: "Password does not match",
            err,
          });
        });
    })
    .catch((err) => {
      res.status(404).send({
        message: "Username not found",
        err,
      });
    });
};

module.exports = {
  register,
  login,
};
