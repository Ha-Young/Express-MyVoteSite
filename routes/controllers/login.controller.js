const createError = require("http-errors");

const User = require("../../model/User");

const cryptograph = require("../../utils/cryptograph");

exports.getLogin = (req, res, next) => res.render("login");

exports.validateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if (user) {
      const { cryptoPassword } = cryptograph(password, user._salt);

      if (cryptoPassword === user.password) {
        req.session.isLogin = true;
        req.session.userId = user._id;
        const redirectPath = req.cookies.lastHref || "/";
        res.clearCookie("lastHref");

        return res.json({ result: "success", redirect: redirectPath });
      }
    }

    return res.json({ result: "invalid" });
  } catch (error) {
    console.error(error);

    return next(createError(500));
  }
};
