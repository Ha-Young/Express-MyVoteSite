const bcrypt = require('bcrypt');
const { SALT_ROUND, } = require('../services/constants');

const bcryptPassword = async (req, res, next) => {
  try {
    const bcryptPassword = await bcrypt.hash(req.body.password, SALT_ROUND);
    res.locals.password = bcryptPassword;

    next();
  } catch (err) {
    next(new Error(err));
  }
};

module.exports = bcryptPassword;
