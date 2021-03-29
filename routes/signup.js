const router = require("express").Router();

const {
  getSignup,
  validateUser,
  addUser,
} = require("./controllers/singup.controller");

router.get("/", getSignup);
router.post("/", validateUser, addUser);

module.exports = router;
