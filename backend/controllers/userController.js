const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../db/userModel");

const ONE_DAY = 24 * 60 * 60 * 1000; // 1 day in milliseconds

const createToken = (
  { id, username },
  expiresIn = process.env.JWT_EXPIRES_IN
) => {
  return jwt.sign(
    {
      userID: id,
      userUsername: username,
    },
    process.env.JWT_SECRET,
    { expiresIn: expiresIn }
  );
};

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
          const jwtUser = { id: user._id, username: user.username };
          const token = createToken(jwtUser);
          const refreshToken = createToken(jwtUser, ONE_DAY);

          res
            .cookie("refreshToken", refreshToken, {
              httpOnly: true,
              maxAge: ONE_DAY,
            })
            .status(200)
            .send({
              message: "Login Successful",
              username: user.username,
              token,
              refreshToken,
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

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(401).send("Access Denied. No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const jwtUser = {
      id: decoded.userID,
      username: decoded.userUsername,
    };
    const token = createToken(jwtUser);
    const newRefreshToken = createToken(jwtUser, ONE_DAY);

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: ONE_DAY,
      })
      .status(200)
      .send({
        message: "Token Refresh Successful",
        username: decoded.username,
        token,
        refreshToken: newRefreshToken,
      });
  } catch (error) {
    return res.status(400).send("Invalid refresh token.");
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
