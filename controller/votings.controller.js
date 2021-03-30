const createError = require('http-errors');
const Voting = require('../models/Voting');

// exports.getAll = async (req, res, next) => {
//   try {
//     const allVotingList = await Voting.find({}).exec();
//     res.render('partial/votingList', { list: allVotingList });
//   } catch (err) {
//     next(createError(err.status));
//   }
// };

exports.showForm = (req, res) => {
  res.render('partial/votingForm', { user: req.user });
};

exports.create = async (req, res, next) => {
  try {
    const {
      title, description, dueDate, inProgress, founder,
    } = req.body;

    const votingData = await Voting.create({
      title, description, dueDate, inProgress, founder,
    });
    if (votingData) {
      console.log('success');
      console.log(votingData.id);
      res.redirect(`/votings/${votingData.id}`);
    } else {
      next(createError('투표 추가에 실패했습니다'));
    }
  } catch (err) {
    next(createError(err.status));
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const voteData = await Voting.findById(req.params.id).exec();
    if (voteData) {
      res.render('partial/votingView', { data: voteData });
    } else {
      next(createError('삭제 되었거나 존재하지 않는 투표입니다'));
    }
  } catch (err) {
    res.render('partial/message', {
      message: '삭제 되었거나 존재하지 않는 투표입니다',
    });
  }
};
