var express = require("express");
var router = express.Router();
const userController=require('./controller/userController');
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "voting-app" });
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "voting-app", style: "login" });
});

router.post("/signup",(req,res,next)=> userController.findOrCreateUser(req,res,next)
);


router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "voting-app", style: "login" });
});

module.exports = router;
