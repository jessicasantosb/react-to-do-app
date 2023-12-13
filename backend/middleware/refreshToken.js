const jwt = require('jsonwebtoken');
require("dotenv").config();

const VerifyRefreshToken =  (req, res) => {
  const {refreshToken} = req.body;
  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  })
};

module.exports = VerifyRefreshToken;