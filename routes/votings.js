const express = require('express');
const Vote = require('../models/Vote');
const verifyUser = require('../routes/middlewares/authorization').verifyUser;

const router = express.Router();

router.get('/new', (req, res, next) => {
  const {
    session: { user }
  } = req;
  res.status(200).render('newVote', { user });
});

router.post('/new', async (req, res, next) => {
  const { body, session } = req;
  try {
    await Vote.create({
      title: body.title,
      author: session.user._id,
      expired: body.expired,
      isExpired: false,
      candidateList: body.itemList.map((item) => {
        return {
          title: item,
          count: 0
        };
      })
    });

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

router.post('/:id', verifyUser, (req, res, next) => {
  const { body } = req;
  res.status(200).send({ body });
});

module.exports = router;
