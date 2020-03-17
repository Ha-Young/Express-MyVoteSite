const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/',
  [
    check('username').isEmail(),
    check('password').isLength({ min: 5 })
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return error = 'error~~~'
        // return res.status(422).json({ errors: errors.array() });
      }

      const { username, password } = req.body;
      const user = await User.findOne({ username: username });

      if(user) return res.status(500).send('username already exists');

      const record = new User();
      record.username = username;
      record.password = record.hashPassword(password);
      await record.save();

      // 클라이언트에서 ajax
      res.write('<script>alert(\'Complete! Please log in.\'); location.href=\'/login\';</script>');
    } catch(err) {
      console.log(err);
      res.status(500).send('error occured')
    }
  }
);

module.exports = router;
