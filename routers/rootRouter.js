import express from 'express';
import { getHome, getLogout, getLogin, postLogin, getSignup, postSignup } from '../controls';

const router = express.Router();

router.get('/', getHome);

router.get('/logout', getLogout);

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/signup', getSignup);

router.post('/signup', postSignup, postLogin);

export default router;
