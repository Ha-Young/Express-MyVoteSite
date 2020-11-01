const bcrypt = require('bcrypt');
const { createOneUserData } = require('../../services/User');

exports.renderSignup = (req, res, next) => {
  try {
    res.render('signup');
  } catch (err) {
    next(err);
  }
};

exports.redirectBackpageOrHome = async (req, res, next) => {
  try {
    const password = req.body.password;
    const saltArounds = 10;

    bcrypt.hash(password, saltArounds, async (err, hash) => {
      const newUserDataSavedInDB = await createOneUserData({
        email: req.body.email,
        password: hash
      });

      if (req.session.backpageUrl === `http://localhost:3000/votings/${req.session.lastVisitedVoteId}`) {
        if (newUserDataSavedInDB) {
          req.flash('email', newUserDataSavedInDB.email);
          res.redirect('/login');
        } else {
          next();
        }
      } else {
        req.session.backpageUrl = process.env.LOCAL_URI + '/signup';

        req.flash('email', newUserDataSavedInDB.email);
        res.redirect('/login');
      }
    });
  } catch (err) {
    return next(err);
  }
};
