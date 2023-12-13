const jwt = require("jsonwebtoken");
require("dotenv").config();

const Auth = (req, res, next) => {
  const token = req.headers["auth"];
  console.log("Received Token:", token);
  if (!token) {
    return res.status(203).send("Access Denied: No Token Found");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    console.error("Token Verification Error:", err);
    return res.status(203).send("Access Denied: Invalid Token");
  }
};

module.exports = Auth;
