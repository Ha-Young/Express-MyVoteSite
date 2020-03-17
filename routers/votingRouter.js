import express from 'express';
import { getNewVote, postVotings, getVoteDetail } from '../controls/votingsController';
const router = express.Router();

router.get('/new', getNewVote);

router.post('/', postVotings);

router.get('/:id', getVoteDetail);

export default router;
