const router = require("express").Router();

const { getLogin, validateUser } = require("./controllers/login.controller");

router.get("/", getLogin);
router.post("/", validateUser);

module.exports = router;
