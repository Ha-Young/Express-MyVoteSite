const render = (page) => {
  return (req, res, next) => {
    res.render(page);
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
