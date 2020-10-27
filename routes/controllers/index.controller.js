const Voting = require('../../models/Voting');
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
    const optionObject = options.map( option => { return { option }});
    const voting = {
      createdBy: _id,
      userName: name,
      votingTitle,
      expirationDate,
      options : optionObject,
    };

    const saveVoting = await Voting(voting).save();

    const userObj = await User.findOne({ _id });
    userObj.votings.push(saveVoting._id);

    await User(userObj).save();

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
