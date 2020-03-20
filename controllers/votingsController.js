import mongoose from 'mongoose';
import Vote from '../models/vote';
import User from '../models/user';
import createError from 'http-errors';
import { dateTransformer } from '../helper';

export const getHome = async (req, res, next) => {
  try {
    const votes = await Vote.find().populate('creator');

    res.locals.dateTransformer = dateTransformer;
    res.render('index', { votes });
  } catch (err) {
    next(createError(500, err));
  }
};

export const getNewVote = (req, res) => {
  res.render('newVoting');
};

export const postVotings = async (req, res, next) => {
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
    next(createError(500, err));
  }
};

export const getVoteDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      next(createError(400, '잘못된 요청입니다.'));
      return;
    }

    const vote = await Vote.findById(id).populate('creator');

    res.locals.dateTransformer = dateTransformer;
    res.render('votingDetail', { vote });
  } catch (err) {
    next(createError(500, err));
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

export const getVoteResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      next(createError(400, '잘못된 요청입니다.'));
      return;
    }

    const vote = await Vote.findById(id).populate('creator');
    const user = req.user;
    const { expirated, creator } = vote;
    const currentTime = new Date().getTime();
    const expiratedTime = new Date(expirated).getTime();
    const isExpirated = expiratedTime - currentTime < 0;
    let isCreator = false;

    if (user) {
      isCreator = creator.id === user.id;
    }

    if (!isCreator) {
      if (!isExpirated) {
        next(createError(403, '권한이 없는 페이지입니다.'));
        return;
      }
    }

    res.locals.dateTransformer = dateTransformer;
    res.render('votingResult', { vote });
  } catch (err) {
    next(createError(500, err));
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
    next(createError(500, err));
  }
};

export const deleteVote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vote = await Vote.findByIdAndDelete(id);

    res.json(vote);
  } catch (err) {
    next(createError(500, err));
  }
};

export const getSuccess = (req, res) => {
  res.render('success');
};

export const getFailure = (req, res) => {
  res.render('failure');
};
