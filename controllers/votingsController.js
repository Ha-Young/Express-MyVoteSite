import Vote from '../models/vote';
import User from '../models/user';
import { dateTransformer } from '../helper';

export const getHome = async (req, res) => {
  try {
    const votes = await Vote.find().populate('creator');

    res.render('index', { votes, dateTransformer });
  } catch (err) {
    // Error handling
  }
};

export const getNewVote = (req, res) => {
  res.render('newVoting');
};

export const postVotings = async (req, res) => {
  try {
    const {
      voting_name,
      expiration_date,
      expiration_time,
      options
    } = req.body;
    const expirated = `${expiration_date}T${expiration_time}`;
    const handledOptions = options.map((option) => ({ value: option }));
    const vote = await Vote.create({
      subject: voting_name,
      options: handledOptions,
      expirated,
      creator: req.user.id,
    });

    res.redirect(`/votings/${vote.id}`);
  } catch (err) {
    // Error handler
  }
};

export const getVoteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await Vote.findById(id).populate('creator');

    res.render('votingDetail', { vote, dateTransformer });
  } catch (err) {
    // Error handling
    console.log(err);
  }
};

export const postVotingDetail = async (req, res) => {
  try {
    const voteId = req.params.id;
    const userId = req.user.id;
    const value = req.body.option;
    const user = await User.findById(userId);
    const vote = await Vote.findById(voteId);
    const targetOption = vote.options.find((option) => option.value === value);

    user.doneVotes.push(voteId);
    targetOption.voter.push(userId);

    await user.save();
    await vote.save();
    res.redirect('/success');
    // Redirect Success
  } catch (err) {
    // Error handling
  }
};

export const getSuccess = (req, res) => {
  res.render('success');
};

export const getVoteResult = async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await Vote.findById(id).populate('creator');

    res.render('votingResult', { vote, dateTransformer });
  } catch (err) {
    // Error handling
    console.log(err);
  }
};