const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('alert', '로그인이 필요한 서비스입니다');

    if (req.params.id) {
      req.session.voteId = req.params.id;
    }
    
    res.redirect('/login');
  }
};

exports.isAuthenticated = isAuthenticated;
