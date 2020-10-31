const User = require('../models/User');

const UserService = {
  signup: async user => {
    try {
      const userExist = await User.findOne({ email: user.email });

      if (!userExist) return await User.create(user);
      return null;
    } catch (error) {
      throw error;
    }
  },
  login: async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) return done(null, false, { loginResult: 'This email does not exist.' });

      return user.comparePassword(password, (error, isMatch) => {
        if (error) return done(error);
        if (isMatch) return done(null, user);

        return done(null, false, { loginResult: 'The password is incorrect.' });
      });
    } catch (error) {
      throw {
        message: '로그인 오류',
      };
    }
  },
  logout: async (req, res) => {
    req.logout();
    res.redirect('/');
  },
  findUser: async (userId, done) => {
    try {
      const user = await User.findById(userId);
      if (user) return done(null, user._id);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserService;
