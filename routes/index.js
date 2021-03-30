const router = require("express").Router();
const { getHome } = require("./controllers/index.controller");

router.get('/', getHome);

module.exports = router;
