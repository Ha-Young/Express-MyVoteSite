require('dotenv').config();

const express = require('express');
const createError = require('http-errors');

const path = require('path');
const bcrypt = require('bcrypt');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const votingsRouter = require('./routes/votings');
const User = require('./models/User');

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  }, async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return done(null, false, { message: '등록되지 않은 이메일입니다' });
    }
    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return done(null, false, { message: '비밀번호를 잘못 입력하셨습니다' });
    }
    return done(null, user);
  } catch (error) {
    if (error) {
      return done(error, { message: '로그인에 실패하였습니다 다시 시도해주십시오' });
    }
  }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.DB_HOST }),
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/votings', votingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'vote!',
    isLogined: req.isAuthenticated()
  });
});

module.exports = app;
