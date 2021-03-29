const routeConfig = {
  home: "/",
  signup: "/signup",
  login: "/login",
  votings: {
    prefix: "/votings",
    detail: "/:id",
    new: "/new",
    success: "/success",
    error: "/error",
  },
  my: {
    votings: "my-votings",
  },

  api: {
    prefix: "/api",
    auth: {
      prefix: "/auth",
      signup: "/signup",
      signin: "/signin",
      logout: "/logout",
    },
  },
};

module.exports = routeConfig;
