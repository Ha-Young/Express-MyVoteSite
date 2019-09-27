const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', async (req, res) => {
  res.render('signup');
});

router.post('/', async (req, res, next) => {
  try {
    const checkDupName = await User.find({ name: req.body.name });
    if (checkDupName.length) {
      req.flash('error', 'name이 중복됩니다. 다른 name을 사용하세요');
      return res.redirect('/signup');
    }
    if (req.body.password !== req.body.password2) {
      req.flash('error', '패스워드가 다릅니다');
      return res.redirect('/signup');
    }
    const hash = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(10));
    await User.create({
      github_id: shortid.generate(),
      name: req.body.name,
      password: hash,
    });
    return res.redirect('/login');
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
});

module.exports = router;
