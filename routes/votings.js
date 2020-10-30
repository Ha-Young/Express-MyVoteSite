const express = require('express');
const moment = require('moment');
const router = express.Router();

const User = require('../models/User');
const Vote = require('../models/Vote');

router.get('/', (req, res, next) => {
  try {
    res.render('votingsList');
  } catch (err) {
    next(err);
  }
});

router.get('/new', async (req, res, next) => {
  try {
    const isLoggedIn = req.session.passport ? true : false;
    const user = isLoggedIn ? await User.findOne({ email: req.session.passport.user.email }) : undefined;

    res.render('newVoting', {
      isLoggedIn: isLoggedIn,
      user: user,
      tomorrow: moment().add(1, 'days').format('YYYY-MM-DD')
    });
  } catch (err) {
    next(err);
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const selections = req.body.selections;
    const transformedArray = [];

    selections.forEach((selection, index) => {
      transformedArray[index] = {
        subTitle: selection[index],
        count: 0
      };
    });

    const parsedDue = Date.parse(req.body.dueDate);
    const authorId = await User.findOne({ email: req.session.passport.user.email });

    const newVoteInfo = await Vote.create({
      title: req.body.title,
      selections: [...transformedArray],
      dueDate: parsedDue,
      author: {
        email: req.session.passport.user.email,
        objectIdInDB: authorId._id
      },
      voter: []
    }, (err, data) => {
      if (err) return next(err);

      res.redirect('/votings/success');
    });
  } catch (err) {
    next(err);
  }
});

router.get('/success', (req, res, next) => {
  try {
    res.render('success');
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    req.session.lastVistedVoteId = req.params.id;

    const voteData = await Vote.findById(req.params.id).exec();
    const isLoggedIn = req.session.passport ? true : false;
    const loggedInUser = isLoggedIn ? await User.findOne({ email: req.session.passport.user.email }) : undefined;
    const voterIdInDB = isLoggedIn ? loggedInUser._id : undefined;
    const isAuthor = voteData.author === loggedInUser ? true : false;
    const voter = voteData.voter;
    let voters = true;

    voters.forEach((voter, index) => {
      if (voter === req.sessionID) {
        voter = false;
      }
    });

    const due = voteData.dueDate.valueOf();
    const now = new Date().valueOf();
    const isExpired = due > now ? false : true;

    if (isExpired) {
      res.redirect(`/votings/${req.params.id}/result`);
    } else {
      res.render('voting', {
        isLoggedIn: isLoggedIn,
        user: loggedInUser,
        voterId: voterIdInDB,
        author: isAuthor,
        hasVote: voter,
        voteData: voteData,
        isExpired: isExpired
      });
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const voteId = req.body.voteId;
    const voterId = req.body.voterId;
    const selectionId = req.body.selectionId;

    await Vote.updateOne(
      { '_id': voteId },
      { $push: { 'voter': voterId } }
    );

    await Vote.updateOne(
      { 'selections._id': selectionId },
      { $inc: { 'selections.$.count': 1 } }
    );

    await User.updateOne(
      { '_id': voterId },
      { $push: { 'voteId': voteId } }
    );

    res.json('Vote complete!');
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteVoteInfo = await Vote.deleteOne({ _id: req.params.id });

    if (deleteVoteInfo.ok === 1) {
      res.json('Delete Success!');
    } else {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id/result', async (req, res, next) => {
  try {
    const voteId = req.params.id;
    const isLoggedIn = req.session.passport ? true : false;
    const user = isLoggedIn ? await User.findOne({ email: req.session.passport.user.email }) : undefined;
    const voteInfo = await Vote.findOne({ _id: voteId });
    const selections = voteInfo.selections;
    let maxNumberVoted = -1;

    selections.forEach((selection) => {
      if (selection.count > maxNumberVoted) {
        maxNumberVoted = selection.count;
      }
    });

    res.render('result', {
      isLoggedIn: isLoggedIn,
      user: user,
      selections: voteInfo.selections,
      max: maxNumberVoted
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
