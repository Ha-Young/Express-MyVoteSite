const express = require("express");
const router = express.Router();
const verifyAuth = require("./middlewares/verifyAuth");

router.get('/', verifyAuth, function(req, res, next) {
  const displayName = req.user ? req.user.userName : null;

  res.render('myVotings', { title: 'My Votings', displayName });
});

module.exports = router;
