import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import connectMongo from 'connect-mongo';
import path from 'path';
import compression from 'compression';
import hpp from 'hpp';
import helmet from 'helmet';
import morgan from 'morgan';
import methodOverride from 'method-override';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'express-flash';
import createError from 'http-errors';
import passportConfig from './lib/config/passport';
import dbConfig from './lib/config/db';
import { COOKIE_MAX_AGE } from './lib/constants';
import { getLocalsLoggedUser } from './lib/middlewares/user';
import homeRouter from './routes/home';
import usersRouter from './routes/users';
import votingsRouter from './routes/votings';

passportConfig();
dbConfig();

const app = express();
const MongoStore = connectMongo(session);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());
app.use(hpp());
app.use(helmet());
app.use(morgan('dev'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: COOKIE_MAX_AGE
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(getLocalsLoggedUser);

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/votings', votingsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  console.log('✔️  Listening on port', process.env.PORT);
});
