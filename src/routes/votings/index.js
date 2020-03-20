import express from 'express';
import { checkLoggedIn } from '../../lib/middlewares/user';
import * as votingsCtrl from './votings.ctrl';

const votings = express.Router();

votings.get('/new', checkLoggedIn, votingsCtrl.renderNewVoting);
votings.post('/new', checkLoggedIn, votingsCtrl.createVoting);

votings.get('/:id', votingsCtrl.getVotingById, votingsCtrl.renderVotingDetail);
votings.put('/:id', checkLoggedIn, votingsCtrl.getVotingById, votingsCtrl.addOptionCount);
votings.delete('/:id', checkLoggedIn, votingsCtrl.getVotingById, votingsCtrl.removeVoting);

export default votings;
