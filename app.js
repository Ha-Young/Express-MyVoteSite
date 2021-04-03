const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const dbLoader = require('./loaders/db/connectDB');
const clientPromise = dbLoader.clientPromise;
const passportLoader = require('./loaders/passports');

const setUserNickname = require('./routes/middleware/setUserNickname');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const votingsRouter = require('./routes/votings');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    clientPromise,
  }),
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use(express.static('public'));

dbLoader.checkDB();
passportLoader(app);

app.use('/', setUserNickname, indexRouter);
app.use('/login', loginRouter);
app.use('/votings', votingsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
