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

const json = (option, statusCode = 200) => {
  return (req, res, next) => {
    res.status(statusCode);
    res.json(option);
  };
};

const redirectBefore = () => {
  return (req, res, next) => {
    if (req.session.previousUrl) {
      req.session.save(() => {
        const tempUrl = req.session.previousUrl;
        delete req.session.previousUrl;
        res.redirect(tempUrl);
      });
    } else {
      res.redirect('/');
    }
  };
};

module.exports = {
  render,
  redirect,
  json,
  redirectBefore,
};
