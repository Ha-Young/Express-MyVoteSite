const UserService = require('../../../services/UserService');
const { TEMPLATE } = require('../../../config/constants');

exports.GETSignup = (_, res) => {
  return res.render(TEMPLATE.SIGNUP);
};
exports.POSTSignup = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await UserService.signup(user);
    if (result) return res.json({ redirect: TEMPLATE.LOGIN });

    return res.json({ signupResult: 'Email Already Exist' });
  } catch (error) {
    return next(error);
  }
};
exports.GETLogin = (req, res) => {
  const { callbackUrl } = req.query;
  return res.render(TEMPLATE.LOGIN, { callbackUrl });
};
exports.POSTLogin = (req, res) => {
  const { callbackUrl } = req.body;
  if (!callbackUrl) return res.redirect(callbackUrl);

  return res.redirect(TEMPLATE.HOME);
};
exports.GETLogout = () => {
  UserService.logout();
};
