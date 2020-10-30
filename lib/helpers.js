const format = require('date-fns/format');

exports.formatExpireDate = votes => {
  return votes.map(vote => {
    return format(vote.expirationDate, 'yyyy/MM/dd HH:mm');
  });
};

exports.formatCreatDate = votes => {
  return votes.map(vote => {
    return format(vote.expirationDate, 'yyyy/MM/dd HH:mm');
  });
};

exports.isExpired = votes => {
  return votes.map(vote => {
    return new Date() > vote.expirationDate;
  });
};
