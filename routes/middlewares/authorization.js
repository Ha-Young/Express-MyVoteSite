const passport = require("passport");

exports.verifyToken = passport.authenticate("jwt", { session: false });
