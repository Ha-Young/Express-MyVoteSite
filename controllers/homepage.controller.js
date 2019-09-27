const Poll = require('../models/Poll');
const { isOpenPoll, formatDateTimeDisplay } = require('../helpers');

const handleGetHomepage = async (req, res, next) => {
  try {
    const pollDocs = await Poll.find({});

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
};

module.exports = {
  handleGetHomepage,
};
