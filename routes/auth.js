const express = require("express");
const {
  getSignup,
  postSignup,
  getLogin,
  postLogin
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

authRouter.get("/signup", getSignup);
authRouter.post("/signup", postSignup);

module.exports = authRouter;
