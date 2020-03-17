const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res, next) => {
  const userId = req.user;
  const user = await User.findById(userId);
  console.log(req.user);
  res.render('index', { user });
});

module.exports = router;
