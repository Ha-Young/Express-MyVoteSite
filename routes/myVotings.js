const router = require("express").Router();

const { ROOT_ROUTE } = require("../constants");
const myVotingsController = require("./controllers/myVotingsController");

router
  .route(ROOT_ROUTE)
  .get(myVotingsController.renderMyVotingsPage);

module.exports = router;
