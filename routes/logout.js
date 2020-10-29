const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);

      return;
    }

    res.status(302).redirect('/');
  });
});

module.exports = router;
