const express = require('express');

const Vote = require('../models/Vote');
const User = require('../models/User');

const verifyUser = require('../routes/middlewares/authorization').verifyUser;

const router = express.Router();

router.get('/new', (req, res, next) => {
  const {
    session: { user }
  } = req;
  res.status(200).render('newVote', { user });
});

router.post('/new', async (req, res, next) => {
  const {
    body,
    session: { user }
  } = req;

  try {
    const newVote = await Vote.create({
      title: body.title,
      author: user._id,
      expired: body.expired,
      isExpired: false,
      candidateList: body.itemList.map((item) => {
        return {
          title: item,
          count: 0
        };
      })
    });

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      $push: { myVoteList: newVote._id }
    });

    updatedUser.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/delete', (req, res, next) => {
  res.status(200).send({ result: 'ok' });
});

router.get('/:id', async (req, res, next) => {
  res.clearCookie('callback');

  const {
    params: { id: vote_id },
    session: { user }
  } = req;
  let isAuthor = false;

  try {
    const vote = await Vote.findById(vote_id).populate('author', 'name');
    if (!vote) throw new Error('No exists');

    if (user && user._id === vote.author._id.toString()) {
      isAuthor = true;
    }

    res.status(200).render('voteDetail', { user, vote, isAuthor });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', verifyUser, async (req, res, next) => {
  const {
    params: { id: vote_id },
    body,
    session
  } = req;

  try {
    const vote = await Vote.findById(vote_id);
    const targetItem = vote.candidateList.find((item) => item.title === body.item);
    const targetExpired = vote.expired;

    if (checkExpire(targetExpired) > 0) {
      const newCount = (targetItem.count += 1);

      await Vote.updateOne(
        { _id: vote_id, 'candidateList.title': body.item },
        {
          $push: { participatedUser: session.user._id },
          $set: {
            'candidateList.$.count': newCount
          }
        }
      );
    } else {
      await Vote.updateOne(
        { _id: vote_id },
        {
          isExpired: true
        }
      );
    }

    res.redirect(`/votings/${vote_id}`);
  } catch (error) {
    next(error);
  }
});

function checkExpire(target) {
  return new Date(target).getTime() - new Date().getTime();
}

module.exports = router;
