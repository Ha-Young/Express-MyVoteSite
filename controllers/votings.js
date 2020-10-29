const User = require('../models/User');
const Voting = require('../models/Voting');

const VIEWS = require('../constants/views');
const { convertToVotingObject } = require('../util/voting');

exports.getAll = async (req, res, next) => {
  try {
    const votings = await Voting.find()
      .sort({ expiration: -1 })
      .populate('author');
    return res.render(VIEWS.INDEX, { title: 'MAIN', votings });
  } catch (err) {
    next(err);
  }
};

exports.getAllMyVotings = async (req, res, next) => {
  const { user } = req;

  try {
    const currentUser = await User.findById(user._id).populate('myVotings');
    const votings = currentUser.myVotings.sort(
      (a, b) => b.expiration - a.expiration
    );

    res.render(VIEWS.INDEX, {
      title: 'My Votings',
      isMyVotings: true,
      votings,
    });
  } catch (err) {
    next(err);
  }
};

exports.getNewVoting = (req, res, next) => {
  res.render(VIEWS.NEW, { title: 'Create New Voting' });
};

exports.postNewVoting = async (req, res, next) => {
  const {
    user: { _id },
    body: userInputs,
  } = req;

  try {
    const newVotingObject = convertToVotingObject(_id, userInputs);
    const newVoting = await Voting.create(newVotingObject);

    const currentUser = await User.findById(_id);
    currentUser.myVotings.addToSet(newVoting._id);
    await currentUser.save();

    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

exports.deleteVoting = async (req, res, next) => {
  const { user, voting } = req;

  if (!user || !voting) return next('no user or voting');

  if (voting.isMine(user._id)) {
    const deletedVoting = await Voting.findByIdAndDelete(voting._id);
    const currentUser = await User.findById(user._id);

    currentUser.myVotings.pull(voting._id);
    await currentUser.save();
    return res.json({
      message: `${currentUser.displayName}님이 작성하신 ${deletedVoting.topic}을 삭제하는데 성공하였습니다.`,
    });
  }

  next('403포비든!');
};

exports.getVoting = async (req, res, next) => {
  const { user, voting } = req;

  try {
    const hasAdminPermission = user && voting.isMine(user._id);
    const hasParticipated = user && voting.isParticipated(user._id);
    await voting.execPopulate('author');

    res.render(VIEWS.VOTING, {
      title: 'Voting Detail',
      voting,
      hasAdminPermission,
      hasParticipated,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateVoting = async (req, res, next) => {
  const {
    user,
    voting,
    body: { selectedOptionId },
  } = req;

  voting.voters.addToSet(user._id);

  const selectedOption = voting.options.find(
    option => option._id.toString() === selectedOptionId
  );

  selectedOption.count += 1;

  await voting.save();

  return res.json({
    message: `${voting.topic}: ${selectedOption.content}에 투표하셨습니다.`,
  });
};
