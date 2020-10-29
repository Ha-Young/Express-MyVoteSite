const { parse, format, formatISO } = require('date-fns');

const convertToISOString = (date, time) => {
  const parsedDate = parse(date + time, 'yyyy-MM-ddHH:mm', new Date());
  return formatISO(parsedDate);
};

exports.convertToVotingObject = (userId, userInputs) => {
  const { topic, option: options, expirationDate, expirationTime } = userInputs;

  return {
    topic,
    options: options.map(option => ({ content: option })),
    author: userId,
    expiration: convertToISOString(expirationDate, expirationTime),
  };
};

exports.formatDate = date => format(date, 'yyyy년 M월 d일  H시 m분');
