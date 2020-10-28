const notFound = (req, res, next) => {
  const error = new Error('404');
  error.statue = 404;

  next(error);
};

module.exports = notFound;
