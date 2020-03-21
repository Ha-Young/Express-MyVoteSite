import express from 'express';
import {
  getLogout,
  getLogin,
  postLogin,
  getSignup,
  postSignup
} from '../controllers/authController';
import {
  getHome,
  getSuccess,
  getMyVotings,
  getFailure
} from '../controllers/votingsController';
import { onlyPublic, onlyPrivacy } from '../middlewares';

const router = express.Router();

router.get('/', getHome);

router.get('/logout', onlyPrivacy, getLogout);

router.get('/login', onlyPublic, getLogin);

router.post('/login', onlyPrivacy, postLogin);

router.get('/signup', onlyPublic, getSignup);

router.post('/signup', onlyPublic, postSignup);

router.get('/success', onlyPrivacy, getSuccess);

router.get('/failure', onlyPrivacy, getFailure);

router.get('/my-votings', onlyPrivacy, getMyVotings);

export default router;
