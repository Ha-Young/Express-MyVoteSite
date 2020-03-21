import createError from 'http-errors';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';
import { VOTING_ERROR_MESSAGE, VOTING_EXPIRED_MESSAGE, SUCCESS_MESSAGE } from '../../lib/constants';
import Voting from '../../models/Voting';
import User from '../../models/User';

export const getVotingById = async (req, res, next) => {
  const { ObjectId } = mongoose.Types;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return next(createError(400));
  }

  try {
    const voting = await Voting.findById(id);

    if (!voting) {
      return next(createError(404));
    }

    res.locals.voting = voting;
    next();
  } catch (e) {
    next(createError(500));
  }
};

export const renderNewVoting = (req, res) => {
  res.render('new_voting', { title: 'new Voting' });
};

export const createVoting = async (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    option_list: Joi.array().min(2).unique().items(Joi.object({
      title: Joi.string()
    })).required(),
    expired_at: Joi.date().min(new Date()).required()
  });

  const optionList = req.body.option_list.map(option => ({
    title: option
  }));

  const validationResult = schema.validate({ ...req.body, option_list: optionList });

  if (validationResult.error) {
    req.flash('error', validationResult.error.details[0].message);
    return res.redirect('/votings/new');
  }

  try {
    const newVoting = await Voting.create({
      ...req.body,
      option_list: optionList,
      organizer: req.user._id
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        my_voting_list: newVoting._id
      }
    }, { new: true });

    req.flash('success', SUCCESS_MESSAGE);
    res.redirect(302, '/');
  } catch (e) {
    next(createError(500));
  }
};

export const renderVotingDetail = async (req, res) => {
  const { voting } = res.locals;

  try {
    const populatedVoting = await Voting.findById(voting).populate({
      path: 'organizer'
    });
    
    res.render('voting_detail', { title: voting.title, voting: populatedVoting });   
  } catch (e) {
    next(createError(500));
  }
};

export const addOptionCount = async (req, res, next) => {
  const { voting } = res.locals;
  const { option_title: optionTitle } = req.body;
  const isExpried = voting.expired_at.getTime() < new Date().getTime();

  if (typeof optionTitle !== 'string') {
    req.flash('error', VOTING_ERROR_MESSAGE);
    return res.redirect(302, `/votings/${voting._id}`);
  }

  if (isExpried) {
    req.flash('error', VOTING_EXPIRED_MESSAGE);
    return res.redirect(302, `/votings/${voting._id}`);
  }

  try {
    const targetIndex = voting.option_list.findIndex(option => option.title === optionTitle);
    voting.option_list[targetIndex].count++;

    await voting.save();

    req.flash('success', SUCCESS_MESSAGE);
    res.redirect(302, `/votings/${voting._id}`);
  } catch (e) {
    next(createError(500));
  }
};

export const removeVoting = async (req, res, next) => {
  const { voting } = res.locals;

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pullAll: {
        my_voting_list: [voting._id]
      }
    }, { new: true });

    await Voting.deleteOne(voting);

    req.flash('success', SUCCESS_MESSAGE);
    res.redirect(302, '/');
  } catch (e) {
    next(createError(500));
  }
};
