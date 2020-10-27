const render = (page, options) => {
  return (req, res, next) => {
    res.render(page, options);
  };
};

const redirect = (page) => {
  return (req, res, next) => {
    res.redirect(page);
  };
};

const redirectBefore = () => {
  return (req, res, next) => {
    res.redirect(req.session.beforeUrl);
  };
};

module.exports = {
  render,
  redirect,
  redirectBefore,
};
