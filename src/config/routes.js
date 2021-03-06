const ROUTE = {
  HOME: "/",
  MY_VOTINGS: "/my-votings",

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
    DETAIL: "/:vote_id",
    NEW: "/new",
    SUCCESS: "/success",
    ERROR: "/error",
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
      VOTES: "/:user_id/votes",
    },
    VOTES: {
      PREFIX: "/votes",
      VOTES: "/",
      VOTE: "/:vote_id",
      VOTE_TO_OPTION: "/:vote_id/vote-to-option",
    },
  },
};

module.exports = ROUTE;
