function requireAuthToUpdate(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.json("/login");
}

module.exports = requireAuthToUpdate;