const router = require('express').Router();
const { authCheck, saveSession } = require('./middlewares/auth');
const User = require('../models/User');

/* GET home page. */
router.get('/', authCheck, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  User.authenticate(req.body.email,
    req.body.password,
    (err, user) => {
      saveSession(err, user, req, res, next);
      res.redirect('/');
    }
  );
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        next(err);
      } else {
        res.redirect('/');
      }
    });
  }
});

module.exports = router;
