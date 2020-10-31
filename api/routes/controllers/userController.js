const UserService = require('../../../services/UserService');

exports.GETSignup = (_, res) => {
  return res.render('signup');
};
exports.POSTSignup = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await UserService.signup(user);
    if (result) return res.json({ redirect: '/login' });

    return res.json({ signupResult: 'Email Already Exist' });
  } catch (error) {
    return next(error);
  }
};
exports.GETLogin = (req, res) => {
  const { callbackUrl } = req.query;
  return res.render('login', { callbackUrl });
};
exports.POSTLogin = (req, res) => {
  const { callbackUrl } = req.body;
  if (!callbackUrl) return res.redirect(callbackUrl);

  return res.redirect('/');
};
exports.GETLogout = () => {
  UserService.logout();
};
