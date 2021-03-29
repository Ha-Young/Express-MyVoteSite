const router = require("express").Router();
const validateUser = require("../middlewares/validateUser");

const { getSignup, addUser } = require("./controllers/singup.controller");

router.get("/", getSignup);
router.post("/", validateUser, addUser);

module.exports = router;
