const express = require("express");
const usersController = require("./controllers/users.controller");
const { validateUser } = require("../util/validator");
const router = express.Router();

/* GET users listing. */
router.get("/login", (req, res, next) => {
  res.status(200).render("login");
});

router.get("/signup", (req, res, next) => {
  res.status(200).render("signup", { error: null });
});

router.post(
  "/signup",
  validateUser,
  usersController.signUp
);

module.exports = router;
