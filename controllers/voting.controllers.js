const Voting = require('../models/Voting');
const User = require('../models/User');

exports.create = async (req, res, next) => {
  try {
    const { title, endDate, endTime, options } = req.body;
    const username = req.user.username;
    let user = await User.findOne({ username: username });
    const expiredAt = new Date(`${endDate} ${endTime}`);

    const voting = new Voting({
      title,
      createdBy: user,
      createdAt: new Date(),
      expiredAt,
      options
    });
    const newVoting = await voting.save();
    req.newVoting = newVoting;
    next();
  } catch(err) {
    console.log(err);
    res.status(500).json('error occured')
  }
}

exports.checkIsAuthor = async (req, res, next) => {
  const voting = req.voting
  let isAuthor = false;

  if(req.user && req.user._id === String(voting.createdBy._id)) {
    isAuthor = true;
  }

  res.render('votingDetail', { voting, isAuthor });
}

exports.updateSelectedOption = async (req, res, next) => {
  const votingId = req.params.voting_id;

  const voting = await Voting.findById(req.params.voting_id).populate('createdBy').lean();
  const options = voting.options;
  const selectedIndex = options.findIndex(i => i.option == req.body.option);

  options[selectedIndex].count++;
  const updatedOptions = options;

  await Voting.updateOne(
    { _id: votingId },
    { $set: { options: updatedOptions } }
  )

  const updatedVoting = await Voting.findById(req.params.voting_id).populate('createdBy').lean();
  req.voting = updatedVoting;
  next();
};

exports.updateExpired = async (req, res, next) => {
  const nowDate = new Date();
  const votings = await Voting.find().lean();
  await Promise.all(
    votings.map(async (voting) => {
      if(voting.expiredAt < nowDate) {
        await Voting.updateOne(
          { _id: voting._id },
          { $set: { isProceeding: false } }
        );
      }
    })
  )
  next();
}
