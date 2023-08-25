const Joi = require("joi");
const unique = require("../../services/auth.services");
const jwt = require("jsonwebtoken");
const MESSAGE = require("../../config/response.messages").responseMessage;

/** Sign up validation */
module.exports.signupValidate = async (req, res, next) => {
  let validate = Joi.object({
    username: Joi.string().required().min(3).max(25),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(15),
  });
  try {
    await validate.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(200).json({
      status: 0,
      message: err.details[0].message,
    });
  }
};

module.exports.uniqueEmailValidate = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await unique.uniqueEmail(data.email);
    if (!result) {
      next();
    } else {
      res.status(200).json({
        status: 0,
        message: MESSAGE.email_exists,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports.uniqueMobileNumberValidate = async (req, res, next) => {
  try {
    let data = req.body;
    let mobileNumber = data.countryCode + "" + data.mobileNumber;
    let result = await unique.uniqueMobileNumber(mobileNumber);
    if (!result) {
      next();
    } else {
      res.status(200).json({
        status: 0,
        message: MESSAGE.mobile_exists,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

module.exports.uniqueUsernameValidate = async (req, res, next) => {
  try {
    let data = req.body;
    let username = data.username;
    let result = await unique.uniqueUsername(username);
    if (!result) {
      next();
    } else {
      res.status(200).json({
        status: 0,
        message: MESSAGE.user_exist,
      });
    }
  } catch (err) {
    console.log("err", err);
  }
};

/** Sign in validation */
/** for sign in validation */
module.exports.signInValidate = async (req, res, next) => {
  let validate = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(15),
  });

  try {
    await validate.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(200).json({
      status: 0111,
      message: err.details[0].message,
    });
  }
};

/** for user account validation using email */
module.exports.userAccountValidate = async (req, res, next) => {
  try {
    let data = req.body;
    let result = await unique.userAccountValidate(data);
    console.log(result);
    if (!result) {
      res.status(200).json({
        status: 0,
        message: MESSAGE.account_not_found,
      });
    } else {
      if (result.status != 1) {
        res.status(200).json({
          status: 0,
          message: result.message,
        });
      } else {
        next();
      }
    }
  } catch (err) {
    console.log("err", err);
    res.status(200).json({
      status: 0,
      message: err.details[0].message,
    });
  }
};

/** Token validation */
module.exports.tokenValidate = async (req, res, next) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.header("x-access-token");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      next();
    } else {
      // Access Denied
      return res.status(401).send({
        status: 0,
        message: MESSAGE.un_auth_user,
      });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send({
      status: 0,
      message: MESSAGE.un_auth_user,
      error,
    });
  }
};
