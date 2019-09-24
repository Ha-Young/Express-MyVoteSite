const User = require('../../models/User');

exports.validateUser = async (req, res, next) => {
  try {
    const {
      password,
      password_confirm: passwordConfirmation
    } = req.body;

    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;

    if (!passwordConfirmation.trim()) {
      req.flash('errorMessage', 'password confirmation required');
      return res.redirect("/join");
    }

    if (password !== passwordConfirmation) {
      req.flash('errorMessage', 'password confirmation does not match');
      return res.redirect("/join");
    }

    if (!PASSWORD_REGEX.test(password)) {
      req.flash('errorMessage', 'Not a valid password');
      return res.redirect("/join");
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      req.flash('errorMessage', 'A user already exists with this email');
      return res.redirect("/join");
    }

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
