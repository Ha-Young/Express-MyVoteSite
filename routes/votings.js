const router = require('express').Router();
const Votings = require('../models/Votings');

router.get('/new', (req, res) => {
  res.render('voting-new', {
    title: 'voting-platform',
    user: req.user
  });
});

router.post('/new',
  async(req, res, next) => {
    try {
      const vote = await Votings.findOne({ voteTitle: req.body.voteTitle });
      if (vote) {
        req.flash('이미 등록된 투표 입니다!!');
        return res.redirect('/voting/new');
      }
      await Votings.create({
        voteTitle: req.body.voteTitle,
        expiryDate: req.body.expiryDate,
        voteOptions1: req.body.voteOptions1,
        voteOptions2: req.body.voteOptions2
      })
      return res.redirect('/');
    } catch(error) {
      next(error);
    }
  }
)

router.get('/:id', async (req, res) => {
  const votings = await Votings.find({});

  const findIndex = votings.findIndex(
    voting => voting.id === req.params.id
  );

  res.render('votings', {
    user: req.user,
    votings,
    findIndex
  });
});

router.post('/success', async (req, res) => {
  const votes = await Votings.find({});

  const findIndex = votes.findIndex(
    vote => vote.id === parseInt(req.params.id)
  );

  res.render('success', { user: req.user, votes, findIndex });
});

module.exports = router;
