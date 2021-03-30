
function requireAuth(req, res, next) {
    if (req.session.passport) {
        next();
    } else {
        res.redirect("/login");
    }
}

exports.requireAuth = requireAuth;