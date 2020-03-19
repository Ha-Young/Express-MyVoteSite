const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('local'));

router.post('/',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    if (req.session.voteId) {
      return res.redirect(`/votings/${req.session.voteId}`);
    }

    res.redirect('/');
  });

module.exports = router;
