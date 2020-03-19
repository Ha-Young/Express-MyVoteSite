const pagePermissions = {
  publicPage: (req, res, next) => {
    if (req.user) {
      res.redirect('/');
    } else {
      next();
    }
  },

  privatePage: (req, res, next) => {
    if (!req.user) {
      req.session.preUrl ? delete req.session.preUrl : null;
      const preUrl = req.params.voting_id || null;
      if (preUrl) req.session.preUrl = `/votings/${preUrl}`;
      res.redirect('/login');
    } else {
      next();
    }
  }
};

module.exports = pagePermissions;
