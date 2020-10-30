const User = require('../../models/User');
const { MESSAGE } = require('../../constants/views');
const { VALIDATION_PROBLEM, ALREADY_REGISTERED } = require('../../constants/messages');
const tryCatchWrapper = require('../../utils/tryCatchWrapper');

const validateSignupForm = tryCatchWrapper(async (req, res, next) => {
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { email, password, username } = req.body;
  const passwordConfirm = req.body['password-confirm'];

  if (
    !email.match(emailFormat)
    || password.length < 4
    || passwordConfirm.length < 4
    || password !== passwordConfirm
    || !username
  ) {
    res.status(200).render(MESSAGE, {
      message: VALIDATION_PROBLEM
    });

    return;
  }

  const emailSearchResult = await User.findOne({ email });

  if (emailSearchResult) {
    res.status(302).render(MESSAGE, {
      message: ALREADY_REGISTERED
    });

    return;
  }

  next();
});

module.exports = validateSignupForm;
