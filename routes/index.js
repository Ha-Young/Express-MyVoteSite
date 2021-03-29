const router = require("express").Router();

const indexController = require("./controllers/indexController");

router
  .route("/")
  .get(indexController.renderIndexPage);

module.exports = router;
