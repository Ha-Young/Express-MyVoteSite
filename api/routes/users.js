const express = require('express');
const UserServices = require('../../services/user');

const router = express.Router();
const userServices = new UserServices();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  // 세션을 지워주어야..
  req.session.destroy();

  res.json({ success: true });
})

router.get('/register', (req, res) => {
  if (req.session.user) {
    res.locals.username = req.session.user.username
  }

  res.render('register');
});

router.get('/', async (req, res, next) => {
  try {
    const user = await userServices.getUser(req.query.username);
    // findOne으로 쿼리를 보냈기 때문에 찾지 못했다면 user는 null이다

    res.render('user', { user });

  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  let result;

  try {
    result = await userServices.authenticate(req.body);
  } catch (err) {
    next(err);
  }

  if (result.isFailed) {
    res.locals.errorMsg = result.message;
    res.render('login');
  } else {
    req.session.user = {
      id: result.userData._id,
      username: result.userData.username,
    };
    req.session.save();

    const path = req.session.unreached ? req.session.unreached : '/';
    delete req.session.unreached;

    res.redirect(path);
  }

});

router.post('/register', async (req, res, next) => {
  try {
    const result = await userServices.createUser(req.body);

    if (result.isFailed) {
      if (req.session.user) {
        res.locals.username = req.session.user.username
      }

      res.render('register', {
        errorMsg: result.errorMsg
      });
    }

    res.redirect('/users/login');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
