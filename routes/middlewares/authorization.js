const jwt = require("jsonwebtoken");
const User = require("../../models/User");

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.cookies["jwt"];
    let decoded;

    if (token) {
      decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET_KEY, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
    }
    
    res.locals.user = decoded?.email;
		
    next();
  } catch (error) {
    next(error);
  }
};

exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: res.locals.user });
    let userData;

    if (user) {
      Reflect.deleteProperty(user, "password");
      userData = user;
    }

    req.user = userData;

    next();
  } catch (error) {
    next(error);
  }
};
