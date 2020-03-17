import express from 'express';
import { getLogout, getLogin, postLogin, getSignup, postSignup } from '../controllers/authController';
import { getHome, getSuccess } from '../controllers/votingsController';

const router = express.Router();

router.get('/', getHome);

router.get('/logout', getLogout);

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/signup', getSignup);

router.post('/signup', postSignup);

router.get('/success', getSuccess);

export default router;
