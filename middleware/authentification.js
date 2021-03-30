const passport = require("passport");

module.exports.authToken = passport.authenticate("jwt", { session: false });
