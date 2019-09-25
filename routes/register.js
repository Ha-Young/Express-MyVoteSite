const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', async (req, res, next) => {
  res.render('signup');
});

router.post('/', async (req, res, next) => {
  const checkDupName = await User.find({ name: req.body.name });
  if (checkDupName.length) {
    req.flash('error', 'name이 중복됩니다. 다른 name을 사용하세요');
    return res.redirect('/signup');
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({
    github_id: shortid.generate(),
    name: req.body.name,
    password: hash,
    voted_list: [],
    created_vote_list: []
  });
  return res.redirect('/login');
});

module.exports = router;
