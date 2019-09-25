const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const falsh = require("connect-flash");
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRouter = require('./routes/main');
const registerRouter = require('./routes/register');
const votingsRouter = require('./routes/votings');
const app = express();
const passport = require('passport');
const userPassport = require('./routes/middleware/passport');
const localPassport = require('./routes/middleware/passport_local');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongodb server');
});

app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.YOUR_SECRET_KEY,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
    resave: false,
    saveUninitialized: true
  })
);
app.use(falsh());
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));

localPassport(passport);
userPassport(passport);

app.use('/', mainRouter);
app.use('/register',registerRouter);
app.use('/votings', votingsRouter);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  if (err.status === 500) {
    err.message = 'Internal Server Error ';
  }
  res.render('error');
});

module.exports = app;
