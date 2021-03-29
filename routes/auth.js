const router = require("express").Router();

const authController = require("./controllers/authController");

router
  .route("/signup")
  .get(authController.renderPage);

module.exports = router;
