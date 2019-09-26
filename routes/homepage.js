const router = require('express').Router();
const Poll = require('../models/Poll');
const { ensureAuthenticated } = require('../config/auth');
const { isOpenPoll, formatTime } = require('../helpers');

router.get('/', ensureAuthenticated, async (req, res, next) => {
  var pollDocs = await Poll.find({}).catch(error => {
    error.status = 500;
    error.message = 'Error while loading homepage';
    next(error);
  });

  pollDocs.forEach(pollDoc => {
    pollDoc.isOpen = isOpenPoll(pollDoc.expirydate);
    pollDoc.expirydate = formatTime(pollDoc.expirydate);
  });

  res.render('home', {
    name: req.user.name,
    polls: pollDocs,
  });
});

module.exports = router;
