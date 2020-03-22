import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import createError from 'http-errors';
import rootRouter from './routers/rootRouter';
import votingRouter from './routers/votingRouter';
import { localMiddleware } from './middlewares';

dotenv.config();

const app = express();
const SessionStore = MongoStore(session);
const db = mongoose.connection;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB connected.'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new SessionStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

import './passport';

app.use(localMiddleware);

app.use('/', rootRouter);
app.use('/votings', votingRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
