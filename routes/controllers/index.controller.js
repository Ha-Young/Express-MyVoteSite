const Voting = require('../../models/Voting');
const Option = require('../../models/Option');
const User = require('../../models/User');
const { isExpiration } = require('../../utils');

exports.getAllVotings = async (req, res, next) => {
  try {
    const votings = await Voting.find();
    votings.map(voting => voting.isExpiration = isExpiration(voting.expirationDate));

    res.render('index', { votings });
  } catch (err) {
    next(err);
  }
};

exports.createVoting = async (req, res, next) => {
  try {
    const { body: { votingTitle, expirationDate, options }, user: { _id, name } } = req;
    const voting = {
      createdBy: _id,
      userName: name,
      votingTitle,
      expirationDate,
    };

    const noOptionVoting = await Voting(voting).save();
    const savedOptions = await Option({ options }).save();
    const votingObj = await Voting.findOne({ _id: noOptionVoting._id });
    const userObj = await User.findOne({ _id: _id });


    votingObj.options.push(savedOptions._id);
    userObj.votings.push(noOptionVoting._id);

    await Voting(votingObj).save();
    await User(userObj).save();

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
