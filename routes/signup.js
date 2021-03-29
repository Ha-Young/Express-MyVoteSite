const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { signup, createUser } = require("../controllers/signupController");

router.get("/", signup);

router.post("/", createUser);

module.exports = router;
