function requireAuthToUpdate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.session.returnTo = req.originalUrl;
    res.json("/login");
}

module.exports = requireAuthToUpdate;