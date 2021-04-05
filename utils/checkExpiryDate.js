const { isBefore } = require("date-fns");

const checkExpiryDate = (voting) => {
  return isBefore(voting.expiryDate, new Date());
};

exports.checkExpiryDate = checkExpiryDate;
