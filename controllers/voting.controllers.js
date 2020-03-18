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

exports.renderVote = async (req, res, next) => {
  try {
    const { id: voteId } = req.params;
    const currentVote = await Votes.findOne({ vote_id: voteId }).populate('created_by').lean();
    const currentUser = req.user ? req.user._id : null;

    const voteInfoForDisplay = makeDisplayInfo(currentVote);

    res.render('vote', {
      vote: voteInfoForDisplay,
      createdBy: voteInfoForDisplay.created_by.toString(),
      currentUser
    });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    const targetVoteId = req.body;
    await Votes.findOneAndDelete({ vote_id: targetVoteId });

    res.redirect('/'); // 여기서 왜 에러가..?
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.registerCastingVote = async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  const { id: voteId } = req.params;
  const selectedOptionIndex = Object.values(req.body)[0];
  // console.log(selectedOptionIndex);
  await Votes.findOneAndUpdate({ vote_id: voteId });
};


// const schema = Schema({ nums: [Number] });
// const Model = mongoose.model('Test', schema);

// const doc = await Model.create({ nums: [3, 4] });
// doc.nums.push(5); // Add 5 to the end of the array
// await doc.save();

// // You can also pass an object with `$each` as the
// // first parameter to use MongoDB's `$position`
// doc.nums.push({
//   $each: [1, 2],
//   $position: 0
// });
// doc.nums; // [1, 2, 3, 4, 5]