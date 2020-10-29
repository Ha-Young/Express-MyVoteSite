const Mongoose = require('mongoose');
const Voting = require('../../models/votingsModel');

module.exports = async (req, res, next) => {
  try {
    // console.log(voting, '/:id route 1st middleware handleVoting');
    const id = req.params.id;
    const voting = await Voting.findById(id);

    if (!voting) {
      throw new Error('cant find the voting');
    }

    // const { max } = await voting.findMax(id);

    // voting.selectOptions.forEach((selectOption) => {
    //   if (selectOption.count === max) {
    //     req.body.result = [selectOption.option, max];
    //   }
    // });

    req.body.voting = voting;
    next();
  } catch (err) {
    next(err);
  }
};
