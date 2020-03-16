import express from 'express';
import path from 'path';
import logger from 'morgan';
import session from 'express-session';
import passport from 'passport';
import createError from 'http-errors';
import { localMiddleware } from './middlewares';
import rootRouter from './routers/rootRouter';
import authRouter from './routers/authRouter';
import votingRouter from './routers/votingRouter';

import './db';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'HELLO',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddleware)

app.use('/', rootRouter);
app.use('/auth', authRouter);
app.use('/votings', votingRouter);

import './passport';

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
