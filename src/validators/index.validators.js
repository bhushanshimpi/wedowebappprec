const authValidator = require("./version-1/auth.validators");

module.exports.validator = {
  signupValidate: authValidator.signupValidate,
  uniqueEmailValidate: authValidator.uniqueEmailValidate,
  uniqueMobileNumberValidate: authValidator.uniqueMobileNumberValidate,
  uniqueUsernameValidate: authValidator.uniqueUsernameValidate,
  tokenValidate: authValidator.tokenValidate,
  signInValidate: authValidator.signInValidate,
  userAccountValidate: authValidator.userAccountValidate,
};
