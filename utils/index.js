const moment = require("moment");

/**
 * add formatted due date to vote document
 * @param {Document} votes document from mongoose
 * @returns mongoose document
 */
exports.addFormattedDueDate = (votes) => {
  return votes.map((vote) => {
    return {
      ...vote,
      dueDate: moment(vote.expiration).format("YYYY-MM-DD HH:mm"),
    };
  });
};
