const express = require("express");
const router = express.Router();

router.get("/success", (req, res, next) => {

});

router.get("/error", (req, res, next) => {

});

router.get("/:id", (req, res, next) => {
  const { params: _id } = req; // 핸들링 필요..
  console.log(req.body);
  console.log(params);
});

module.exports = router;
