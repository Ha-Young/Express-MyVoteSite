const bcrypt = require('bcrypt');
const saltRounds = 10;

const bcryptPassword = async (req, res, next) => {
  try {
    const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);
    res.locals.password = bcryptPassword;
    console.log(bcryptPassword);
    next();
  } catch (err) {
    next(new Error(err));
  }
};

module.exports = bcryptPassword;
