const router = require("express").Router();

const indexController = require("./controllers/indexController");
const authenticateUser = require("../utils/authenticateUser");

router
  .route("/")
  .get(indexController.renderIndexPage);

module.exports = router;
