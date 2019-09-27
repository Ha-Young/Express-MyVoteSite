const router = require('express').Router();
const Poll = require('../models/Poll');
const { ensureAuthenticated } = require('../config/authentication');
const { isOpenPoll, formatDateTimeDisplay } = require('../helpers');

router.get('/', ensureAuthenticated, async (req, res, next) => {
  try {
    var pollDocs = await Poll.find({});
    
    pollDocs.forEach(pollDoc => {
      pollDoc.isOpen = isOpenPoll(pollDoc.expirydate);
      pollDoc.expirydate = formatDateTimeDisplay(pollDoc.expirydate);
    });

    res.render('home', {
      name: req.user.name,
      polls: pollDocs,
    });
  } catch (error) {
    error.status = 500;
    error.message = 'Error while loading homepage';
    next(error);
  }
});

module.exports = router;
