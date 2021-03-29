const express = require("express");
const router = express.Router();
const { mainPage } = require("../controllers/indexController");

router.get("/", mainPage);

router.post("/", async (req, res) => {
  const { title, date, option} = req.body;
});

module.exports = router;
