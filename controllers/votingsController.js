import mongoose from 'mongoose';
import Vote from '../models/vote';
import User from '../models/user';
import { dateTransformer } from '../helper';

export const getHome = async (req, res) => {
  try {
    const votes = await Vote.find().populate('creator');

    res.locals.dateTransformer = dateTransformer;
    res.render('index', { votes });
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
    const user = req.user;
    const vote = await Vote.create({
      subject: voting_name,
      options: handledOptions,
      expirated,
      creator: req.user.id,
    });

    user.ownVotes.push(vote.id);
    await user.save();
    res.redirect('/');
  } catch (err) {
    // Error handler
    console.log(err);
  }
};

export const getVoteDetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.redirect('/');
      return;
    }

    const vote = await Vote.findById(id).populate('creator');

    res.locals.dateTransformer = dateTransformer;
    res.render('votingDetail', { vote });
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
  } catch (err) {
    res.redirect('/failure');
  }
};

export const getVoteResult = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.redirect('/');
    }

    const vote = await Vote.findById(id).populate('creator');

    res.locals.dateTransformer = dateTransformer;
    res.render('votingResult', { vote });
  } catch (err) {
    // Error handling
    console.log(err);
  }
};

export const getMyVotings = async (req, res) => {
  try {
    const userId = req.user.id;
    const me = await User.findById(userId).populate({
      path: 'ownVotes',
      populate: { path: 'creator' }
    });
    const votes = me.ownVotes;

    res.locals.dateTransformer = dateTransformer;
    res.render('myVotings', { votes });
  } catch (err) {
    // Error handling
  }
};

export const deleteVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vote = await Vote.findByIdAndDelete(id);

    res.json(vote);
  } catch (err) {

  }
};

export const getSuccess = (req, res) => {
  res.render('success');
};

export const getFailure = (req, res) => {
  res.render('failure');
};
