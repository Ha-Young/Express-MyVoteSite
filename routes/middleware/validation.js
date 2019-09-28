const User = require('../../models/User');

exports.validateUser = async (req, res, next) => {
  try {
    const {
      email,
      name,
      password,
      password_confirm: passwordConfirmation
    } = req.body;

    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const NAME_REGEX = /^[가-힣]{2,4}|[a-zA-Z]{2,20}$/;

    if (!email.trim() || !name.trim() || !password.trim()) {
      req.flash('validationError', 'All fields are required');
      return res.redirect('/join');
    }

    if (!passwordConfirmation.trim()) {
      req.flash('validationError', 'Password confirmation required');
      return res.redirect('/join');
    }

    if (password !== passwordConfirmation) {
      req.flash('validationError', 'Password confirmation does not match');
      return res.redirect('/join');
    }

    if (!EMAIL_REGEX.test(email)) {
      req.flash('validationError', 'Not a valid email');
      return res.redirect('/join');
    }

    if (!PASSWORD_REGEX.test(password)) {
      req.flash('validationError', 'Not a valid password');
      return res.redirect('/join');
    }

    if (!NAME_REGEX.test(name)) {
      req.flash('validationError', 'Not a valid name');
      return res.redirect('/join');
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      req.flash('validationError', 'A user already exists with this email');
      return res.redirect('/join');
    }

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.validateVote = (req, res, next) => {
  try {
    const {
      title,
      expired_at,
      options
    } = req.body;

    const DATE_REGEX = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])([1-9]|[01][0-9]|2[0-3])([0-5][0-9])$/;

    if (!title.trim()) {
      req.flash('validationError', 'Title required!');
      return res.redirect('/votings/new');
    }

    const isOptionTitleExist = options.every(option => option.trim());

    if (!isOptionTitleExist) {
      req.flash('validationError', 'You must provide at least 2 options!');
      return res.redirect('/votings/new');
    }

    if (title.trim().length > 50) {
      req.flash('validationError', 'Maximum 50 characters are allowed for title!');
      return res.redirect('/votings/new');
    }

    const isOptionLengthValid = options.every(option => option.trim().length <= 80);

    if (!isOptionLengthValid) {
      req.flash('validationError', 'Maximum 80 characters are allowed for options!');
      return res.redirect('/votings/new');
    }

    if (!DATE_REGEX.test(expired_at.join(''))) {
      req.flash('validationError', 'Not a valid date or time format');
      return res.redirect('/votings/new');
    }

    const dates = expired_at.map((date, i) => (i === 1) ? Number(date) - 1 : Number(date));

    if (new Date() - new Date(...dates) > 0) {
      req.flash('validationError', 'Expiry date should be greater than current date');
      return res.redirect('/votings/new');
    }

    res.locals.isoDate = new Date(...dates).toISOString();
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
