const createError = require('http-errors');

const Voting = require('../../models/Voting');

const findVotingById = async (req, res, next, id) => {
  try {
    const voting = await Voting.findById(id);
    req.voting = voting;
    next();
  } catch (error) {
    return next(createError(400, `Voting with id(${id}) was not found.`));
  }
};

module.exports = findVotingById;
