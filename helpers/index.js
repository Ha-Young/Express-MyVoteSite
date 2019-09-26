const moment = require('moment');

const parseStringToDate = (dateString, timeString) => {
  return moment(`${dateString} ${timeString}`).format();
};

const isOwner = (userID, authorID) => {
  return String(userID) === String(authorID) ? true : false;
};

const isOpenPoll = date => {
  return moment(date).valueOf() > new Date().getTime() ? true : false;
};

const formatTime = date => {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm a');
};

const weekInMilliseconds = 1000 * 60 * 60 * 24 * 7;

module.exports = {
  parseStringToDate,
  isOwner,
  isOpenPoll,
  formatTime,
  weekInMilliseconds
};
