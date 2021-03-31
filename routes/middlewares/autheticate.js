const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    if (req.params.id) {
      res.cookie("votingUrl", req.params.id);
      return res.json({ status: 403, message: "로그인 하셔야합니다." });
    }

    res.status(301).redirect("/auth/login");
  }
};

module.exports = authenticateUser;
