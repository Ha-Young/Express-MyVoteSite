const router = require("express").Router();

router.get("/", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
