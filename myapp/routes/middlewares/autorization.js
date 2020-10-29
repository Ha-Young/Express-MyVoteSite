module.exports= function checkAuthenticated(req, res, next) {
  console.log("PUT 요청 확인하기",req.body);
  if (req.isAuthenticated()) return next();
  if (req.body.targetOptionId && !req.isAuthenticated()) {
    console.log("from PUT 요청, but not loged in");
    req.session.lastUrl = req.body.lastPageURL;
    res.status(401).end();
    return;
  }
  res.redirect(302, '/login');
}
