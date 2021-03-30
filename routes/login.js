const express = require("express");
const router = express.Router();

const { isNotAuthenticated } = require("../middlewares/checkIsAuthenticated");

const loginController = require("../controllers/login.controller");

router.get("/", isNotAuthenticated, loginController.get);
router.post("/", isNotAuthenticated, loginController.post);
router.delete("/", loginController.delete);

module.exports = router;
