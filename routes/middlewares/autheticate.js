const AUTH = require("../../constants/authConstants");

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  if (req.params.id) {
    res.cookie("votingUrl", req.params.id);
    return res.status(401).json({ message: AUTH.LOGIN_MESSAGE });
  }

  res.status(301).redirect("/auth/login");
};

module.exports = authenticateUser;
