const mongoose = require('mongoose');
const Vote = require('../models/Vote');
const User = require('../models/User');
const error = require('../libs/error');
const { STATUS } = require('../constants/constants');

exports.renderVoteList = async (req, res, next) => {
  try {
    const votes = await Vote.find();

    res.render('home', { votes });
  } catch (err) {
    next(new error.GeneralError(err.message));
  }
};

exports.renderNewVote = async (req, res, next) => {
  try {
    res.render('voteNew', { message: req.flash('invalid') });
  } catch (err) {
    next(new error.GeneralError(err.message));
  }
};

exports.renderDetailVote = async (req, res, next) => {
  try {
    const { id: voteId } = req.params;
    let checkDuplicateUser = false;
    let checkExistUser;

    const vote = await Vote.findById(voteId).populate('creater');

    if (req.user) {
      const { _id: userId } = req.user;
      checkExistUser = userId;

      const checkedUser = !!vote.options.find((item) =>
        item.voters.indexOf(userId) > -1
      );

      checkedUser? checkDuplicateUser = true : checkDuplicateUser = false;
    } else {
      checkDuplicateUser = false;
      checkExistUser = false;
    }

    const expiredDate = vote.expired_at.toISOString();
    const currentDate = new Date().toISOString();

    if (currentDate.toString() > expiredDate.toString()) {
      await Vote.update(
        {
          _id: voteId
        },
        {
          status: STATUS.EXPIRED
        }
      );
    }

    res.render('voteDetail', {
      message : 'message',
      title: vote.title,
      creater: vote.creater.name,
      createrId: vote.creater._id,
      expired: vote.expired_at.toISOString(),
      status: vote.status,
      options: vote.options,
      checkDuplicateUser,
      voteId,
      checkExistUser
    });
  } catch (err) {
    next(err);
  }
};

exports.handleNewVote = async (req, res, next) => {
  try {
    const { options } = req.body;
    const { _id: userId } = req.user;
    const convertedOptions = options.map((option) => {
      return {
        title: option,
        voters: []
      };
    });

    const vote = await Vote.create({
      title: req.body.title,
      creater: req.user._id,
      expired_at: res.locals.expired,
      options: convertedOptions
    });

    await User.findByIdAndUpdate(userId,
      {
        $push: {
          votes: vote._id
        }
      }
    );

    res.render('success', { message: '성공적으로 투표를 생성했습니다!' });
  } catch (err) {
    next(err);
  }
};

exports.handleUpdateVote = async (req, res, next) => {
  try {
    await Vote.update(
      {
        _id: req.params.id,
        'options._id': req.body.option
      },
      {
        $inc: {
          'options.$.check_count': 1
        },
        $push: {
          'options.$.voters': req.user._id
        }
      }
    );

    res.render('success', { message : '투표가 종료된후 결과를 확인할수있습니다.' })
  } catch (err) {
    next(err);
  }
};

exports.handleDeleteVote = async (req, res, next) => {
  try {
    const { deleteId } = req.body;
    await Vote.findByIdAndDelete(deleteId);
    res.render('success', { message: '성공적으로 삭제하였습니다!'})
  } catch (err) {
    next(err);
  }
};

exports.renderPersonalPage = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const voteList = await User.findById(userId).populate('votes');
    res.render('personalPage', { voteList: voteList.votes });
  } catch (err) {
    next(err);
  }
};
