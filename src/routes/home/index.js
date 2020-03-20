import express from 'express';
import { checkLoggedIn } from '../../lib/middlewares/user';
import * as homeCtrl from './home.ctrl';

const home = express.Router();

home.get('/', homeCtrl.renderHome);
home.get('/my-votings', checkLoggedIn, homeCtrl.renderMyVotings);

export default home;
