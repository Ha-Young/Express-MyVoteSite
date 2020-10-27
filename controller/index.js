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

module.exports = {
  render,
  redirect,
};
