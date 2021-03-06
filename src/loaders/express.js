const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const path = require("path");
const { format } = require("date-fns");
const sassMiddleware = require("node-sass-middleware");
const session = require("express-session");

const passportLoader = require("./passport");
const { logger } = require("./logger");

module.exports = function ({ app, routerLoader }) {
  app.set("view engine", "ejs");
  app.use(expressLayouts);

  app.set("views", "./views/pages");
  app.set("layout", "../layout");

  app.use(
    sassMiddleware({
      src: path.resolve(__dirname, "../../scss"),
      dest: path.resolve(__dirname, "../../public/stylesheets"),
      indentedSyntax: false,
      force: true,
      outputStyle: "compressed",
    })
  );

  app.use(express.static(path.resolve(__dirname, "../../public")));

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride("_method"));
  app.use(cookieParser());

  // express-session
  app.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
    })
  );

  // passport
  passportLoader({ app });

  // router
  routerLoader({ app });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    res.render("404", { user: req.user || {} });
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    if (err.message === "celebrate request validation failed") {
      err.status = 400;
      err.message = "Bad Request";
    }

    res.locals.message = err.message;
    res.locals.status = err.status || 500;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    logger.error(format(new Date(), "yyyy-MM-dd hh:mm:ss"), err);

    // render the error page
    res.status(err.status || 500);


    if (req.headers["content-type"] === "application/json" || err.json) {
      res.json({
        error: err.message.toLowerCase() || "error",
      });
    } else {
      res.render("error");
    }
  });
};
