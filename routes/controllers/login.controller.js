const User = require("../../model/User");
const cryptograph = require("../../utils/cryptograph");

exports.getLogin = (req, res, next) => {
  const renderProps = { isInvalid: false, method: "get" };
  console.log(req.session)
  res.render("login", renderProps);
}

exports.validateUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (user) {
    const { cryptoPassword } = cryptograph(password, user._salt);

    if (cryptoPassword === user.password) {
      req.session.isLogin = true;
      req.session.userId = user._id;

      return res.redirect("/");
    }
  }

  const renderProps =  { isInvalid: true, method: "post" };

  return res.render("login", renderProps);
};
