const user = require("../models/users");
const User = require("../models/users");
const MESSAGE = require("../config/response.messages").responseMessage;

//** Mongo get user list
module.exports.getUsers = async () => {
  try {
    return await user.find();
  } catch (err) {
    return err;
  }
};

/** Sign Up */
module.exports.createUser = async (data) => {
  try {
    let createUser = new User(data);
    return await createUser.save();
  } catch (error) {
    return error;
  }
};

/** check mobile is exists */
module.exports.uniqueMobileNumber = async (data) => {
  try {
    return await User.findOne({ wholeMobileNumber: data });
  } catch (err) {
    console.log("err unique mobile number", err);
    return err;
  }
};

module.exports.uniqueEmail = async (data) => {
  try {
    return await User.findOne({ email: data });
  } catch (err) {
    console.log("err unique email", err);
  }
};

module.exports.uniqueUsername = async (data) => {
  try {
    return await User.findOne({ username: data });
  } catch (err) {
    console.log("err unique user name: ", err);
    return err;
  }
};

module.exports.signIn = async (data) => {
  try {
    return await User.findOne({ email: data.email });
  } catch (err) {
    return err;
  }
};

/** Sign In */
/** for user account validation using email address */
module.exports.userAccountValidate = async (data) => {
  try {
    const userAccountValidate = await User.findOne({ email: data.email });
    if (!userAccountValidate) {
      return { status: 0, message: MESSAGE.user_not_found };
    }
    if (userAccountValidate.isVerified == "0") {
      return {
        status: 0,
        message: MESSAGE.profile_verification_pending,
      };
    } else if (userAccountValidate.isVerified == 2) {
      return { status: 0, message: MESSAGE.profile_suspended };
    } else if (userAccountValidate.deletedAt != 0) {
      return { status: 0, message: MESSAGE.account_docent_access };
    } else {
      return { status: 1, message: MESSAGE.user_verified };
    }
  } catch (err) {
    return err;
  }
};
