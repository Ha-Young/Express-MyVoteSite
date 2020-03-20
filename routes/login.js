const express = require('express'),
      router = express.Router(),
      passport = require('passport');

router.get('/', (req, res, next) => {
  let referer = req.headers.referer;
  if (referer) {
    let redirectUrl = referer.split('/');
    res.render('login', { redirectUrl: redirectUrl });
  } else {
    res.render('login', { redirectUrl: '/' });
  }
});

router.post('/', passport.authenticate('login',
    {
      failureRedirect: '/login',
      failureFlash: '아이디와 비밀번호를 확인 해주세요',
      successFlash: '로그인에 성공하였습니다. 이 문구는 한번만 표시 됩니다.'
    }), (req, res, next) => {
      let path = encodeURIComponent(req.body.redirectUrl.split(',').pop());
      let redirectUrl = 'votings/' + encodeURIComponent(path);
      console.log(path)
      if (path && path !== 'signup' && path !== '%2F') {
        res.redirect(redirectUrl);
      } else {
        res.redirect('/');
      }
    }
);

module.exports = router;
