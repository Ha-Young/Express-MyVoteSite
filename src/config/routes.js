const ROUTE = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  VOTINGS: {
    PREFIX: "/votings",
    DETAIL: "/:id",
    NEW: "/new",
    SUCCESS: "/success",
    ERROR: "/error",
  },

  MY: {
    VOTHINGS: "my-votings",
  },

  API: {
    PREFIX: "/api",
    AUTH: {
      PREFIX: "/auth",
      SIGNUP: "/signup",
      SIGNIN: "/signin",
      LOGOUT: "/logout",
    },
  },
};

module.exports = ROUTE;
