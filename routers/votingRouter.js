import express from 'express';
import { postVotings } from '../controls/votingsController';
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('newVoting');
});

router.post('/', postVotings);

router.get('/:id', (req, res) => {
  res.render('votingDetail');
});

export default router;
