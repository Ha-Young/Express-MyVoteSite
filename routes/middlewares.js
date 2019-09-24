exports.isNotLoggedIn = (res, req, next) => {
  console.log(req,'route middlewares');
  if(!req.isAuthenticated()){
    console.log('eq.isAuthenticated');
    next();
  } else {
    console.log('hi');
    res.redirect('/login');
  }
}

//현재 사용하지 않음.
