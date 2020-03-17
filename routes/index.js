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
// function(req, res, next) {
//   console.log(req.body);
//   const {email}=encodeURIComponenet(req.body);
//   console.log(email);
//   //암호화를 해야하고

//   //디비에 있는지 확인을 해야하고

//   // 없으면 만들고

//   //있으면 있다고 알람을 띄워줘야하고
// res.end("회원가입완료");
// }
);

router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "voting-app", style: "login" });
});

module.exports = router;
