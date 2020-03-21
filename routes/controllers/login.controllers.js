const createError = require('http-errors');
const passport = require('passport');

exports.validation = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(createError({
        status: 409,
        message: '인증 오류가 발생 했습니다'
      }));
    }

    if (!user) {
      return next(createError({
        status: 409,
        message: '유저를 찾을 수 없습니다'
      }));
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(createError({
          status: 409,
          message: '로그인 오류가 발생 했습니다'
        }));
      }

      if (req.session.redirectUrl) {
        res.redirect(req.session.redirectUrl);
      } else {
        res.redirect('/');
      }
    });
  })(req, res, next);
}
