const express = require("express");
const router = express.Router();
const { loginPage, loginUser } = require("../controllers/loginController");

router.get("/", loginPage);

router.post("/", loginUser);

module.exports = router;
