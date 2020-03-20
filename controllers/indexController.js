const passport = require('passport');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const moment = require('moment');
const mongoose = require('mongoose');

const User = require('../models/User');
const Voting = require('../models/Voting');
const REGEXP = require('../configs/REGEXP');
moment.locale('ko');

const indexController = {
  getMain: async (req, res, next) => {
    try {
      const votingList = await Voting.find().populate('creator');

      for (let i = 0; i < votingList.length; i++) {
        const formatDate = moment(votingList[i].endDate).fromNow();
        votingList[i].formatDate = formatDate;
      }
      votingList.currentDate = new Date();

      res.render('index', { votingList });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) return next(createError(400, { errorCode: 311 }));
      if (error.name === 'MongoError' && err.code === 11000) return next(createError(400, { errorCode: 500 }));
      next(error);
    }
  },

  getMyVotings: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate('votingList');
      const votingList = user.votingList;

      for (let i = 0; i < votingList.length; i++) {
        const formatDate = moment(votingList[i].endDate).fromNow();
        votingList[i].formatDate = formatDate;
      }
      votingList.currentDate = new Date();

      res.render('myVotings', { votingList, userName: req.user.name });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) return next(createError(400, { errorCode: 311 }));
      if (error.name === 'MongoError' && err.code === 11000) return next(createError(400, { errorCode: 500 }));
      next(error);
    }
  },

  getLogin: (req, res, next) => {
    res.render('login');
  },

  postLogin: passport.authenticate('local', { failureRedirect: '/login' }),

  localUserLogin: async (formEmail, formPassword, done) => {
    try {
      const checkUser = await User.findOne({ email: formEmail });
      if (!checkUser) throw createError(400, { errorCode: 200 });

      const user = { id: checkUser._id, name: checkUser.name, email: checkUser.email };
      const isCorrectPassword = bcrypt.compareSync(formPassword, checkUser.hash, (err, result) => result);

      if (isCorrectPassword) {
        done(null, user);
      } else {
        throw createError(400, { errorCode: 200 });
      }
    } catch (error) {
      if (error.name === 'MongoError' && err.code === 11000) return next(createError(400, { errorCode: 500 }));
      done(error);
    }
  },

  postPrePageLogin: (req, res) => {
    const preUrl = req.session.preUrl || '/';
    req.session.preUrl ? delete req.session.preUrl : null;
    res.redirect(preUrl);
  },

  getLogout: (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  },

  getSignup: (req, res, next) => res.render('signup'),

  postSignup: async (req, res, next) => {
    const {
      body: { email, password, password2, name }
    } = req;

    try {
      const duplicateUserData = await User.findOne({ email });

      if (!email) throw createError(400, { errorCode: 100 });
      if (REGEXP.CHECK_BLANK.test(email)) throw createError(400, { errorCode: 101 });
      if (duplicateUserData) throw createError(400, { errorCode: 102 });
      if (!REGEXP.CHECK_EMAIL_VALIDATION.test(email)) throw createError(400, { errorCode: 103 });
      if (email.length > 32) throw createError(400, { errorCode: 104 });
      if (email.length < 8) throw createError(400, { errorCode: 105 });

      if (!password || !password2) throw createError(400, { errorCode: 120 });
      if (password !== password2) throw createError(400, { errorCode: 121 });
      if (password.length < 8 || password2.length < 8) throw createError(400, { errorCode: 122 });
      if (password.length > 24 || password2.length > 24) throw createError(400, { errorCode: 123 });

      if (!name) throw createError(400, { errorCode: 140 });
      if (REGEXP.CHECK_BLANK.test(name)) throw createError(400, { errorCode: 141 });
      if (name.length < 2) throw createError(400, { errorCode: 142 });
      if (name.length > 6) throw createError(400, { errorCode: 143 });

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = new User({ name, email, hash });
      await user.save();

      res.redirect('/login');
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) return next(createError(400, { errorCode: 311 }));
      if (error instanceof mongoose.Error.ValidationError) return next(createError(400, { errorCode: 500 }));
      if (error.name === 'MongoError' && err.code === 11000) return next(createError(400, { errorCode: 500 }));
      next(error);
    }
  }
};

module.exports = indexController;
