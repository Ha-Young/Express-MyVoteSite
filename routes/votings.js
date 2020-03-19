const express = require('express');
const router = express.Router();
const checkUser = require('../middlewares/checkUser');
const { findUser } = require('../utils/helpers');
const Voting = require('../models/Voting');
const moment = require('moment');
const error = require('../lib/error');

router.get('/new', checkUser, async (req, res) => {
  const user = await findUser(req);

  res.render('voting-creation', { user });
});

router.get('/:id', async (req, res, next) => {
  const user = await findUser(req);

  try {
    const { id } = req.params;
    const voting = await Voting.findById(id).populate('user');

    if (user) {
      // console.log(String(voting.user._id) === String(user._id));
      if (String(voting.user._id) === String(user._id)) {
        // console.log(voting);
        return res.render('voting-detail', {
          voting,
          moment,
          user,
          sameUser: true
        });
      }
    }

    if (voting.is_expired) {
      voting.options.sort((a, b) => {
        return a.option_count > b.option_count ? -1 : 1;
      });

      return res.render('voting-detail', { voting, moment, user });
    }

    res.render('voting-detail', { voting, moment, user });
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:id', async (req, res) => {
  const user = findUser(req);
  const { id } = req.params;

  await Voting.findByIdAndDelete(id);

  res.render('success', { user, message: '삭제' });
});

router.post('/new', checkUser, async (req, res) => {
  try {
    const {
      body: { 'voting-title': title, options, date, time }
    } = req;
    const user = await findUser(req);
    const optionObj = options.map(element => {
      return {
        option_title: element,
        option_count: 0
      };
    });
    const deadline = new Date(`${date} ${time}`).getTime();
    const currentTime = new Date().getTime();

    if (!title.trim() || !date.trim() || !time.trim()) {
      throw new error.VotingValidationError();
    }
    console.log(optionObj);
    if (deadline < currentTime) throw new error.VotingTimeError();
    optionObj.forEach(item => {
      if (!item.option_title.trim()) {
        throw new error.VotingValidationError();
      }
    });
    await new Voting({
      user,
      title,
      options: optionObj,
      deadline: deadline
    }).save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    if (
      err instanceof error.VotingTimeError ||
      err instanceof error.VotingValidationError
    ) {
      return res.render('voting-creation', { error: err.displayMessage });
    }
  }
});

router.post('/:id/selection/:id2', checkUser, async (req, res) => {
  const { id: votingId, id2: optionId } = req.params;
  const user = await findUser(req);

  try {
    const target = await Voting.findOne(
      { _id: votingId, 'options._id': optionId },
      { 'options.$': 1 }
    );
    const voting2 = await Voting.findById(votingId);
    let { option_count } = target.options[0];
    const votedUser = voting2.voted_user.find(user => user === user._id);

    if (votedUser) throw new error.VotingDuplicateError();

    await Voting.update(
      { 'options._id': optionId },
      {
        $set: {
          'options.$.option_count': parseInt(option_count) + 1
        }
      }
    );

    await Voting.findByIdAndUpdate(votingId, { $push: { voted_user: user._id } });

    // const voting = await Voting.findById(votingId).populate('user', 'nickname');

    res.render('success', { user, message: '투표' });
  } catch (err) {
    const voting = await Voting.findById(votingId).populate('user', 'nickname');

    if (err instanceof error.VotingDuplicateError) {
      return res.render('voting-detail', { voting, moment, error: err.displayMessage });
    }
  }
});

module.exports = router;
