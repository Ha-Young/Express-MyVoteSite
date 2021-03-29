const router = require("express").Router();

const { getSignup, addUser } = require("./controllers/singup.controller");

router.get("/", getSignup);
router.post("/", addUser);

module.exports = router;
