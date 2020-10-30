const express = require('express');
const VoteService = require('../../services/VoteService');
const { isLoggedIn, setLocals } = require('../middlewares/middlewares');

const router = express.Router();

router.get('/new', isLoggedIn, setLocals, (req, res, next) => {
  res.render('createVoting');
});

router.post('/new', isLoggedIn, async (req, res, next) => {
  const userId = req.user;
  const { title, description, choice, date } = req.body;
  const voteItem = {
    authorId: userId,
    title: title,
    description: description,
    choiceList: choice,
    expiredDate: new Date(date).getTime(),
  };

  try {
    await VoteService.create(voteItem);
    res.redirect('/');
  } catch (error) {
    console.log(error)
    next(error);
  }
});

router.get('/:votingId', setLocals, async (req, res, next) => {
  const { votingId } = req.params;
  const userId = req.user;

  try {
    const item = await VoteService.getContents(votingId, userId);

    if (String(item.authorId) === String(userId)) return res.render('voting', { voteItem: item, canDelete: true });
    return res.render('voting', { voteItem: item });
  } catch (error) {
    next(error);
  }
});

router.put('/:votingId', isLoggedIn, setLocals, async (req, res, next) => {
  const { votingId } = req.params;
  const userId = req.user;
  const { choice } = req.body;

  try {
    const voteResult = await VoteService.setVoting(votingId, userId, choice);

    return res.json({ result: voteResult });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:votingId', isLoggedIn, setLocals, async (req, res, next) => {
  const { votingId } = req.params;

  try {
    await VoteService.deleteVoting(votingId);
    res.json({
      result: true,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
