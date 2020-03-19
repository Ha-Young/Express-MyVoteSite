const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('local'));

router.post('/',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    if (req.session.voteId) {
      const voteId = req.session.voteId;
      delete req.session.voteId;
      return res.redirect(`/votings/${voteId}`);
    }
    res.redirect('/');
});

module.exports = router;
