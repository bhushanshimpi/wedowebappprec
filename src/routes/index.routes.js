const authRouter = require("../routes/version-1/auth.routes");
const userRouter = require("../routes/version-1/users.routes");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return true;
});

require("../config/db");

router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
