const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const email = isLoggedIn ? req.session.passport.user.email : undefined;

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
});

router.post('/', passport.authenticate('local'), async (req, res, next) => {
  try {
    if (req.session.backpageUrl) {
      const backpageUrl = req.session.backpageUrl;
      delete req.session.backpageUrl;

      req.session.save(() => {
        res.redirect(backpageUrl);
      });
    } else {
      res.redirect('/');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
