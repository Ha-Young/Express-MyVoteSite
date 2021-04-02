const moment = require("moment");

/**
 * add formatted due date to vote document
 * @param {Document} votes document from mongoose
 * @returns mongoose document
 */
exports.addFormattedDueDate = (votes) => {
  if (!Array.isArray(votes)) {
    return {
      ...votes,
      dueDate: moment(votes.expiration).format("YYYY-MM-DD HH:mm"),
    };
  }

  return votes.map((vote) => {
    return {
      ...vote,
      dueDate: moment(vote.expiration).format("YYYY-MM-DD HH:mm"),
    };
  });
};

/**
 * extract options from req.body and return them
 * @param {object} req req object of route callback function
 * @returns options passed by req.body
 */
exports.extractOptions = (req) => {
  const options = [];

  Object
    .keys(req.body)
    .forEach((key) => {
      if (key.match(/^option/)
      && (req.body[key] !== "")
      ) {
        options.push({
          name: req.body[key],
        });
      }
    });

  return options;
};

exports.hideEmail = (email) => {
  const indexOfAt = email.indexOf("@");
  const extracted = email.substring(0, indexOfAt);
  const hideFrom = (extracted.length / 2) > 3 ? 3 : Math.floor(extracted.length / 2);
  const hidden = `${extracted.substring(0, hideFrom)}*****`;

  return hidden + email.substring(indexOfAt, email.length);
};
