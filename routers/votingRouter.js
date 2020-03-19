import express from 'express';
import {
  getNewVote,
  postVotings,
  getVoteDetail,
  postVotingDetail,
  getVoteResult,
  deleteVote
} from '../controllers/votingsController';

const router = express.Router();

router.post('/', postVotings);

router.get('/new', getNewVote);

router.get('/:id', getVoteDetail);

router.post('/:id', postVotingDetail);

router.delete('/:id', deleteVote);

router.get('/:id/result', getVoteResult);

export default router;
