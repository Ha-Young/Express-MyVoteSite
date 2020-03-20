require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const home = require('./routes/home');
const voting = require('./routes/voting');
const setPassport = require('./config/passport');
const error = require('./libs/error');

const app = express();

mongoose.connect(process.env.MONGO_CLOUD_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', function () {
  console.log('MongoDB Connection Failed!');
});
db.once('open', function () {
  console.log('MongoDB Connected! Success!');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(session({
  secret: process.env.SESSION_KEY,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());
setPassport(passport);
app.use(methodOverride('_method'));
app.use(flash());

app.use('/', home);
app.use('/voting', voting);

app.use(function(req, res, next) {
  next(new error.UndefinedError('invalid URL. Check pls')); //undefined 이름 바꿀것.
});

app.use(function(err, req, res, next) {
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { error: err.displayMessage });
});

module.exports = app;
