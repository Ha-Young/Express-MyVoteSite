const router = require("express").Router();

const { ROOT_ROUTE } = require("../constants");
const indexController = require("./controllers/indexController");

router
  .route(ROOT_ROUTE)
  .get(indexController.renderIndexPage);

module.exports = router;
