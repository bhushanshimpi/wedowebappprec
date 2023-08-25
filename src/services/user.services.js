const user = require("../models/users");

//** Mongo get user list
module.exports.getUsers = async () => {
  try {
    return await user.find();
  } catch (err) {
    return err;
  }
};
