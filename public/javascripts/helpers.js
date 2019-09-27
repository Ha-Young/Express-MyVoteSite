const moment = require('moment');
const mongoose = require('mongoose');

exports.formatDate = (date) => {
  const currentDate = new Date();
  const formattingExpiration = new Date(date);
  const isOpen = currentDate.getTime() < formattingExpiration.getTime();
  const expiration = moment(date).format('YYYY MMM ddd, ahh:mm');

  return {
    isOpen,
    expiration,
  };
};

exports.isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
