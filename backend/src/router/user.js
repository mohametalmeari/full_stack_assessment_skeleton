const { findAllUsers, findUsersByHome } = require("../controllers/user");

module.exports = (router) => {
  router.get("/user/find-all", findAllUsers);
  router.get("/user/find-by-home/:homeId", findUsersByHome);
};
