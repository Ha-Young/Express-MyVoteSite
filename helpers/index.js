const moment = require('moment');

const formatDateTimeString = (dateString, timeString) => {
  const formattedDateTime = moment(`${dateString} ${timeString}`).format();
  return formattedDateTime
};

const isOwner = (userID, authorID) => {
  return String(userID) === String(authorID) ? true : false;
};

const isOpenPoll = date => {
  const expireDateTimeInUnixMilliseconds = moment(date).valueOf();
  const timeNowInUnixMilliseconds = moment();
  return expireDateTimeInUnixMilliseconds > timeNowInUnixMilliseconds ? true : false;
};

const formatDateTimeDisplay = date => {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm a');
};

const weekInMilliseconds = 1000 * 60 * 60 * 24 * 7;

module.exports = {
  formatDateTimeString,
  isOwner,
  isOpenPoll,
  formatDateTimeDisplay,
  weekInMilliseconds
};
