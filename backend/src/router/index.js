const { Router } = require("express");

const router = Router();

const user = require("./user");
const home = require("./home");

module.exports = () => {
  user(router);
  home(router);

  return router;
};
