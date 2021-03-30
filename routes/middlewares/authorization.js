require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const verifyToken = async (req, res, next) => {
  const token = req.cookies["access_token"];

  if (!token) {
    res.redirect("/login");

    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    res.redirect("/login");

    return;
  }

  req.user = user;
  next();
};

module.exports = verifyToken;
