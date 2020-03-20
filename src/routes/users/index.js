import express from 'express';
import { checkLoggedIn } from '../../lib/middlewares/user';
import * as usersCtrl from './users.ctrl';

const users = express.Router();

users.get('/login', usersCtrl.renderLogin);
users.post('/login', usersCtrl.login, usersCtrl.loginCallback);

users.get('/signup', usersCtrl.renderSignup);
users.post('/signup', usersCtrl.signup);

users.get('/logout', checkLoggedIn, usersCtrl.logout);

export default users;
