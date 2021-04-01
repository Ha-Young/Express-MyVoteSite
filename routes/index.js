const router = require("express").Router();

const {
  getHome,
  getProgressVotesList,
  getCloseVotesList,
} = require("./controllers/index.controller");

router.get("/", getHome);
router.get("/progress", getProgressVotesList);
router.get("/close", getCloseVotesList);

module.exports = router;
