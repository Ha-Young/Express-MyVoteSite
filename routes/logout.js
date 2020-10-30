const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.render('logout');
    req.session.destroy();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
