import express from 'express';
import { getLogout, getLogin, postLogin, getSignup, postSignup } from '../controls';
import { getHome, getSuccess } from '../controls/votingsController';

const router = express.Router();

router.get('/', getHome);

router.get('/logout', getLogout);

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/signup', getSignup);

router.post('/signup', postSignup);

router.get('/success', getSuccess);

export default router;
