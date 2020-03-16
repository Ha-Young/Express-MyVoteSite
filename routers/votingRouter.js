import express from 'express';

const router = express.Router();

router.get('/new', (req, res) => {
  res.render('newVoting');
});

router.get('/:id', (req, res) => {
  res.render('votingDetail');
});

export default router;
