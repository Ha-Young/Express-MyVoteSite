const User = require('../../models/User');
const {
  signupErrorMessage : {
    PASSWORD_NOT_MATCHED,
    INVALID_PASSWORD,
    EMAIL_NOT_AVAILABLE,
    INVALID_EMAIL,
  },
} = require('../../constants');

exports.checkSignupValidation = async (req, res, next) => {
  const { email, password, confirm_password: confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      req.flash('message', PASSWORD_NOT_MATCHED);
      return res.redirect('signup');
    }

    if (password.length < 9) {
      req.flash('message', INVALID_PASSWORD);
      return res.redirect('signup');
    }

    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegExp.test(email)) {
      req.flash('message', INVALID_EMAIL);
      return res.redirect('signup');
    }

    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      req.flash('message', EMAIL_NOT_AVAILABLE)
      return res.redirect('signup');
    }
    next();
  } catch (error) {
    next(error);
  }
};
