const Voting = require('../../models/Voting');
const Option = require('../../models/Option');
exports.getAllVoting = async (req, res, next) => {
  try {
    const votings = await Voting.find();

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
    votingObj.options.push(savedOptions._id);

    const saveVoting = await Voting(votingObj).save();

    console.log(saveVoting);

    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
