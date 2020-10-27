const express = require('express');
const UserServices = require('../../services/user');

const router = express.Router();
const userServices = new UserServices();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
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

    console.log(req.session);

    res.redirect('/');
  }

});

router.post('/register', async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await userServices.createUser(req.body);

    if (result.isFailed) {
      res.render('register', {
        errorMsg: result.errorMsg
      });
    }

    console.log('가입 성공! => ', result);
    res.redirect('/users/login');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
