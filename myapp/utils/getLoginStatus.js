const getLoginStatus = (req) => {
  return req.isAuthenticated();
};

module.exports = getLoginStatus;
