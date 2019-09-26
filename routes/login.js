const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login', { message: req.flash("error") });
});

module.exports = router;