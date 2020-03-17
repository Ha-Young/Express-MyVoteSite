const User = require("../../models/User");
async function findOrCreateUser(req, res, next) {
  console.log('request:',req.body);
  const {email}=req.body;
  const targetUser = await User.findOne({ email:email });
  if(targetUser){
    console.log('이미존재');
  }else{
    console.log('정보를 저장합니다');
    User.create(req.body);
  }

  res.render("signup", { title: "voting-app", style: "login" });
}

module.exports = { findOrCreateUser };
