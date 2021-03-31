const express = require("express");
const usersController = require("./controllers/users.controller");
const authenticateToken = require("./middlewares/authorization");
const { validateUser, validateLogin } = require("./middlewares/validator");
const router = express.Router();

/* GET users listing. */
router.get("/login", (req, res, next) => {
  const url = req.originUrl;
    console.log(url);
  res.status(200).render("login");
});

router.post("/login", validateLogin, usersController.signIn);

router.get("/logout", usersController.signOut);

router.get("/signup", (req, res, next) => {
  res.status(200).render("signup", { error: null });
});

router.post(
  "/signup",
  validateUser,
  usersController.signUp
);

module.exports = router;
