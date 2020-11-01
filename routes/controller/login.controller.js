exports.redirectHomeOrRenderLogin = (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const email = isLoggedIn ? req.session.passport.user.email : req.flash('email')[0];

    req.session.backpageUrl = req.header('referer');

    if (isLoggedIn) {
      res.redirect('/');
    } else {
      res.render('login', {
        isLoggedIn: isLoggedIn,
        user: isLoggedIn ? req.session.passport.user.email : undefined,
        email: email,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.redirectBackpageOrHome = async (req, res, next) => {
  try {
    const backpageUrl = req.session.backpageUrl;

    if (backpageUrl) {
      if (backpageUrl === process.env.LOCAL_URI + '/signup') {
        res.redirect('/');
      } else if (backpageUrl === process.env.LOCAL_URI + '/logout') {
        res.redirect('/');
      } else {
        delete req.session.backpageUrl;

        req.session.save(() => {
          res.redirect(backpageUrl);
        });
      }
    } else {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
};
