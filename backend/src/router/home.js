const { findHomesByUser, updateHomeUsers } = require("../controllers/home");

module.exports = (router) => {
  router.get("/home/find-by-user/:userId", findHomesByUser);
  router.put("/home/update-users", updateHomeUsers);
};
