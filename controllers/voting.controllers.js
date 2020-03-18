const Votes = require('../models/Votes');
const Users = require('../models/Users');
const errors = require('../lib/errors');
const { makeDisplayInfo } = require('../lib/helpers');

exports.registerVote = async (req, res, next) => {
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

  try {
    const counter = await Votes.estimatedDocumentCount();

    const createdVote = await Votes.create({
      title,
      vote_id: counter + 1,
      select_options: selectOptionList,
      created_by: req.user._id,
      expires_at: expirationTime
    });

    const currentUser = await Users.findById(req.user._id);
    const { votes_created } = currentUser;
    votes_created.push(createdVote._id);

    await currentUser.updateOne({ votes_created });

    res.redirect('/');
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.renderVote = async (req, res, next) => {
  try {
    const { id: voteId } = req.params;
    const currentVote = await Votes.findOne({ vote_id: voteId }).populate('created_by').lean();
    const currentUser = req.user ? req.user.username : null;
    console.log(req.user);

    const voteInfoForDisplay = makeDisplayInfo(currentVote);

    res.render('vote', {
      vote: voteInfoForDisplay,
      createdBy: voteInfoForDisplay.created_by,
      currentUser
    });
  } catch(err) {
    next(new errors.NonExistingVoteError());
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    const deleteTargetVote = await Votes.findOne({ vote_id: req.body }).lean();
    await Votes.findOneAndDelete({ vote_id: req.body });

    const currentUser = await Users.findById(req.user._id);
    let { votes_created } = currentUser;

    votes_created = votes_created.filter(vote_id => {
      return vote_id.toString() !== deleteTargetVote._id.toString();
    });

    await currentUser.updateOne({ votes_created });

    res.redirect('/'); // 여기서 왜 에러가..?
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.registerCastingVote = async (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }

  try {
    const { id: voteId } = req.params; // vote_id 값. 2와 같은 숫자.
    const selectedOptionIndex = Object.values(req.body)[0];

    const vote = await Votes.findOne({ vote_id: voteId });
    const { select_options } = vote;
    const selectedOption = select_options[selectedOptionIndex];

    selectedOption.vote_counter++;
    selectedOption.voter = req.user._id;

    await vote.updateOne({ select_options });

    await Users.findByIdAndUpdate(req.user._id, { votes_voted: [ vote._id ]});
  } catch(err) {

  }
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