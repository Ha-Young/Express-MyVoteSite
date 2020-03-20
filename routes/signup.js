const express = require('express'),
      passport = require('passport'),
      router = express.Router();

router.get('/', (req, res, next) => {
  res.render('signup');
});

router.post('/', passport.authenticate('signup',
    {
      successRedirect: '/login',
      failureRedirect: '/signup',
      successFlash: '회원가입 성공',
      failureFlash: '회원가입 실패'
    }
  )
);

module.exports = router;
