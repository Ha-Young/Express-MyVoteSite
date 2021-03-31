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

  VOTE: {
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
    USER: {
      VOTES: "/:id/votes",
    },
    VOTES: {
      PREFIX: "/votes",
      VOTES: "/",
      VOTE: "/:id",
    },
  },
};

module.exports = ROUTE;
