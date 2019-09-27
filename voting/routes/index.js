const router = require('express').Router();
const voteController = require('./controllers/vote.controller');

const checkAuthorization = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log('non auth');
    res.redirect('/login');
  } else {
    next();
  }
};

router.get('/', checkAuthorization, voteController.getAll);

module.exports = router;
