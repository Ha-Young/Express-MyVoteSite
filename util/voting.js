const { parse, format, formatISO } = require('date-fns');

const parseUserInputs = (date, time) => {
  const parsedDate = parse(date + time, 'yyyy-MM-ddHH:mm', new Date());
  return parsedDate;
};

const convertToVotingObject = (userId, userInputs) => {
  const { topic, option: options, expirationDate, expirationTime } = userInputs;

  return {
    topic,
    options: options.map(option => ({ content: option })),
    createdBy: userId,
    expiration: formatISO(parseUserInputs(expirationDate, expirationTime)),
  };
};

const formatDate = date => format(date, 'yyyy년 M월 d일  H시 m분');

const getSortedOptions = options => {
  const maxCount = Math.max(...options.map(option => option.count));

  return options
    .sort((a, b) => b.count - a.count)
    .map(option => ({
      content: option.content,
      count: option.count,
      elected: option.count === maxCount,
    }));
};

module.exports = {
  parseUserInputs,
  convertToVotingObject,
  formatDate,
  getSortedOptions,
};
