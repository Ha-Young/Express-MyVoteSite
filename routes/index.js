const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/home', require('./home'));
router.use('/auth', require('./auth'));
router.use('/votings', require('./votings'));

module.exports = router;
