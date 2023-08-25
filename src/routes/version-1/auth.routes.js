const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/auth.controller");
const validator = require("../../validators/index.validators").validator;
const UserController = require("../../controllers/user.controller");

router.post(
  "/signUp",
  [
    validator.signupValidate,
    validator.uniqueEmailValidate,
    validator.uniqueMobileNumberValidate,
    validator.uniqueUsernameValidate,
  ],
  AuthController.signUp
);
router.post(
  "/signIn",
  [validator.signInValidate, validator.userAccountValidate],
  AuthController.signIn
);

router.post('/store-launches', UserController.insertData);

router.post('/store-launches', UserController.insertData);

router.get('/launches-filter', UserController.filterLaunches);

router.get('/update-ship-data/:key', UserController.updateShip);


module.exports = router;
