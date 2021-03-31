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
