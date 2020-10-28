const { parse, formatISO, isBefore } = require('date-fns');

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
