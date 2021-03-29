const morgan = require('morgan');

const mongooseLoader = require('./mongoose');
const expressLoader = require('./express');
const routerLoader = require('./router');
const { stream } = require("./logger");

module.exports = async function ({ expressApp }) {
  await mongooseLoader();

  expressApp.use(morgan("combined", { stream }));

  await expressLoader({ app: expressApp, routerLoader });
};
