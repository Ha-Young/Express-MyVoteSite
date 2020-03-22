const moment = require('moment');
const mongoose = require('mongoose');
const createError = require('http-errors');

const User = require('../models/User');
const Voting = require('../models/Voting');

const votingsController = {
  getNewVoting: (req, res, next) => res.render('newVoting'),

  postNewVoting: async (req, res, next) => {
    const { body: { title, item, datetime }} = req;

    try {
      const user = await User.findById(req.user.id);
      const time = new Date(datetime).toISOString();

      if (!title) throw createError(400, { errorCode: 304 });
      if (title.length < 1) throw createError(400, { errorCode: 305 });
      if (title.length > 20) throw createError(400, { errorCode: 306 });
      if (item.includes('')) throw createError(400, { errorCode: 307 });
      if (item.length < 2) throw createError(400, { errorCode: 308 });
      if (!datetime) throw createError(400, { errorCode: 309 });
      if (new Date(time).getTime() < new Date().getTime()) throw createError(400, { errorCode: 310 });

      const voting = new Voting({
        title: title,
        creator: req.user.id,
        count: 0,
        endDate: time,
        items: item.map(vote => ({ item: vote, count: 0 }))
      });

      user.votingList.push(mongoose.Types.ObjectId(voting._id));

      await user.save();
      await voting.save();

      res.redirect('/');
    } catch (error) {
      if (error.name === 'RangeError') return next(createError(400, { errorCode: 312 }));
      if (error instanceof mongoose.Error.CastError) return next(createError(400, { errorCode: 311 }));
      if (error instanceof mongoose.Error.ValidationError) return next(createError(400, { errorCode: 500 }));
      if (error.name === 'MongoError' && err.code === 11000) return next(createError(400, { errorCode: 500 }));
      next(error);
    }
  },

  getDetailVoting: async (req, res, next) => {
    const votingId = req.params.voting_id;

    try {
      const voting = await Voting.findById(votingId).populate('creator');

      if (!voting) throw createError(400, { errorCode: 311 });

      voting.formatDate = moment(voting.endDate).format('LLLL');
      voting.currentDate = new Date();
      res.render('detailVoting', { voting });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) return next(createError(400, { errorCode: 311 }));
      if (error.name === 'MongoError' && err.code === 11000) return next(createError(400, { errorCode: 500 }));
      next(error);
    }
  },

  postVotingComplete: async (req, res, next) => {
    const votingId = req.params.voting_id;
    const votingItemId = req.body.voting;
    const userId = req.user.id;

    try {
      const voting = await Voting.findById(votingId);

      if (!voting) throw createError(400, { errorCode: 311 });
      if (!votingItemId) throw createError(400, { errorCode: 300 });
      if (voting.joinUsers.includes(userId)) throw createError(400, { errorCode: 302 });
      if (new Date().getTime() > new Date(voting.endDate).getTime()) throw createError(400, { errorCode: 301 });

      voting.items.filter(vote => String(vote._id) === votingItemId)[0].count++;
      voting.joinUsers.push(mongoose.Types.ObjectId(userId));
      voting.count++;

      await voting.save();

      res.render('votingAfter', { message: '🙆‍♂️ 투표에 정상적으로 참여되었습니다. 🙆‍♀️' });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) return next(createError(400, { errorCode: 311 }));
      if (error.name === 'MongoError' && err.code === 11000) return next(createError(400, { errorCode: 500 }));
      next(error);
    }
  },

  deleteVoting: async (req, res, next) => {
    try {
      const votingId = req.params.voting_id;
      const user = await User.findById(req.user.id);
      const checkDelete = await Voting.deleteOne({ _id: votingId });

      if (checkDelete.ok === 1) {
        const idIndex = user.votingList.findIndex(id => String(id) === votingId);
        user.votingList.splice(idIndex, 1);
        await user.save();
        res.json({ message: '삭제하였습니다.', ok: checkDelete.ok });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(202).json({ message: '삭제에 실패했습니다. 다시 시도해주세요' });
    }
  }
};

module.exports = votingsController;
