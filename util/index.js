const format = require("date-fns/format");

exports.formatExpirationDate = (votes) => {
  for (const vote of votes) {
    vote.expiration_date = {
      date: vote.expiration_date,
      formatted_date: format(vote.expiration_date, "yyyy-MM-dd HH:mm")
    };
  }
  return votes;
};
