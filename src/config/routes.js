const ROUTE = {
  HOME: "/",
  AUTH: {
    PREFIX: "/",
    SIGNUP: "/signup",
    LOGIN: "/login",
    LOGOUT: "/logout",
    LOGIN_GOOGLE: "/login-google",
    LOGIN_GOOGLE_REDIRECT: "/login-google/redirect",
  },

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
