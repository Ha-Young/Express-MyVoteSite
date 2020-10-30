const User = require('../../models/User');

exports.verifyJoinedUser = async (req, res, next) => {
  const { id } = req.body;

  try {
    const verifyUser = await User.findOne({ id: id });

    if (!verifyUser) {
      next();
    }

    return res.redirect('/');
  } catch (err) {
    return res.status(400).render('error', {
      errorMessage: '입력정보를 확인하세요.'
    });
  }
};
