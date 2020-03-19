import passport from 'passport';
import User from '../models/user';

export const getLogin = (req, res) => {
  const { redirect_id: id } = req.query;

  res.render('login', { id });
};

export const postLogin = (req, res) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      // Error Handling
    }

    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        // Error Handing
      }

      const { redirect_id: id } = req.query;

      if (id) {
        res.redirect(`/votings/${id}`);
      } else {
        res.redirect('/');
      }
    });
  })(req, res);
}


passport.authenticate('local', (req, res) => {
  const { redirect_id: id } = req.query;

  if (id) {
    res.redirect(`/votings/${id}`);
  } else {
    res.redirect('/');
  }
});

export const getSignup = (req, res) => {
  res.render('signup');
};

export const postSignup = async (req, res) => {
  const {
    username,
    email,
    password,
    password2
  } = req.body;

  if (password !== password2) {
    res.send('Password is not Matched');
  } else {
    try {
      const user = new User({
        username,
        email
      });

      await User.register(user, password);
      res.redirect('/login');
    } catch (err) {
      // Error handling
      res.redirect('/');
    }
  }
};

export const getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};
