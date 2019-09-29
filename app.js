const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./passport');
const flash = require('connect-flash');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const votingRouter = require('./routes/votings');

const app = express();
passportConfig(passport);

// Dotenv requring in only development env

if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config({
    path: './.env'
  });
}

// Mongoose setup

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mongoose connecton

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We are connected!');
});

// Basic modules

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'cat runner',
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routers

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/votings', votingRouter);

// Catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler

app.use(function(err, req, res, next) {

  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
