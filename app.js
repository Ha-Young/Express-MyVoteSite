require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();

const path = require('path');
const logger = require('morgan');

const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const votingRouter = require('./routes/votings');
const myVotingRouter = require('./routes/myVotings');

const passport = require('passport');
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;

// passport 랑 DB 로직 밖으로 분리하기
passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passwordField: 'password'
  },
  function (username, password, done) {
    User.findOne({ id: username }, (err, user) => {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect E-MAIL' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log('serial');
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log(1);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: false
}));

const db = mongoose.connection;
const port = process.env.PORT;

mongoose.connect( // mongodb 주고도 env에 넣어야 되나..?
  `mongodb+srv://theyyyzzz3:1234@cluster0.r2mjk.mongodb.net/votingPlatform?retryWrites=true&w=majority`,
  {
    dbName: 'votingPlatform',
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

db.on('error', () => console.log('mongoDB-error'));
db.once('open', () => console.log('mongoDB-connected'));

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/votings', votingRouter);
app.use('/myvotings', myVotingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
