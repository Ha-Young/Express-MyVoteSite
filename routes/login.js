const express = require('express');
const router = express.Router();
const { passportAuthenticate } = require('./controllers/userManagement.controller');


router.get('/', (req, res, next) => {
  res.status(200).render('login', {
    referer: req.headers.referer
  });
});

router.post('/', passportAuthenticate);

module.exports = router;
