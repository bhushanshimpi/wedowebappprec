const express = require("express");
const userRouter = express.Router();
const UserController = require("../../controllers/user.controller");
const validator = require("../../validators/index.validators").validator;

userRouter.get("/list", [validator.tokenValidate], UserController.getUsers);

module.exports = userRouter;
