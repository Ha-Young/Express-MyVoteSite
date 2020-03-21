import express from 'express';
import {
  getNewVote,
  postVotings,
  getVoteDetail,
  postVotingDetail,
  getVoteResult,
  deleteVote
} from '../controllers/votingsController';
import { onlyPrivacy } from '../middlewares';

const router = express.Router();

router.post('/', onlyPrivacy, postVotings);

router.get('/new', onlyPrivacy, getNewVote);

router.get('/:id', getVoteDetail);

router.post('/:id', onlyPrivacy, postVotingDetail);

router.delete('/:id', onlyPrivacy, deleteVote);

router.get('/:id/result', getVoteResult);

export default router;
