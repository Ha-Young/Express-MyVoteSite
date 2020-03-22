require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const createError = require('http-errors');
const PrettyError = require('pretty-error');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const votingRouter = require('./routes/votings');
const myVotingRouter = require('./routes/myVotings');

const app = express();
const pe = new PrettyError();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET_CODE,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URL,
    collection: 'sessions'
  })
}));

require('./config/mongoose');
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/votings', votingRouter);
app.use('/my-Votings', myVotingRouter);
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.use((req, res, next) => {
  next(createError(404, '페이지를 찾을 수 없습니다.'));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(
    `< Error ${err.status} >
    ${err.message}

    < Error Stack >
    ${pe.render(err)}
    `
  );

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
