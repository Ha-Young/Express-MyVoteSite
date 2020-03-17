const Votes = require('../models/Votes');
const errors = require('../lib/errors');
const { makeDisplayInfo } = require('../lib/helpers');

exports.registerVote = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { title, expires_at, ...options } = req.body;

  const expirationTime = new Date(expires_at).toISOString();
  const currentTime = new Date().toISOString();

  if (expirationTime < currentTime) {
    return next(new errors.InvalidExpirationError());
  }

  const selectOptionList = Object.values(options).map(option => ({
    description: option,
    vote_counter: 0,
    voter: []
  }));

  const counter = await Votes.estimatedDocumentCount();

  try {
    await Votes.create({
      title,
      vote_id: counter + 1,
      select_options: selectOptionList,
      created_by: userId,
      expires_at: expirationTime
    });

    res.redirect('/');
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

// const votesInfoForDisplay = votes.map(vote => {
//   return makeDisplayInfo(vote);
// });

exports.renderVote = async (req, res, next) => {
  const { id: voteId } = req.params;
  const currentVote = await Votes.findOne({ vote_id: voteId }).populate('created_by').lean();

  const voteInfoForDisplay = makeDisplayInfo(currentVote);

  res.render('vote', {
    vote: voteInfoForDisplay,
    createdBy: voteInfoForDisplay.created_by.toString(),
    currentUser: req.user._id
  });
};


// {
// _id: 5e70c0e591229c21bde2290b,
// title: '내일 커피, 사먹을 것인가!',
// vote_id: 2,
// select_options: [
//   {
//     vote_counter: 0,
//     voter: [],
//     _id: 5e70c0e591229c21bde2290c,
//     description: '사먹자'
//   },
//   {
//     vote_counter: 0,
//     voter: [],
//     _id: 5e70c0e591229c21bde2290d,
//     description: '돈 아끼자!'
//   }
// ],
// created_by: 5e70beb99448712166e94e80,
// expires_at: 2020-03-18T00:09:00.000Z,
// created_at: 2020-03-17T12:21:57.117Z,
// updated_at: 2020-03-17T12:21:57.117Z,
// __v: 0
// }