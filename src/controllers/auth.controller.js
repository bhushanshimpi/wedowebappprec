var authModel = require("../services/auth.services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const MESSAGE = require("../config/response.messages");

module.exports.getUsers = async (req, res) => {
  try {
    let userData = await authModel.getUsers();
    res.send({
      status: 1,
      data: userData,
    });
  } catch {
    res.send({
      status: 0,
      message: MESSAGE.unable_to_get_user,
    });
  }
};

//* Get Chat with User List /
module.exports.addUser = async function (req, res) {
  try {
    let users = await authModel.insertDemo(req.body);
    return res.send({
      status: 1,
      message: MESSAGE.data_found,
      data: users,
    });
  } catch (err) {
    return err;
  }
};

module.exports.signUp = async (req, res) => {
  let data = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    let user = await authModel.createUser(data);
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASS, // generated ethereal password
      },
    });
    let mailOptions = {
      from: process.env.SMTP_USER, // sender address
      to: data.email, // list of receivers
      subject: process.env.APP_NAME + " – Email Verification", // Subject line
      html: "<h1>Hi!</h1>", // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("EMAIL ERROR: ", error);
        return res.send({
          status: 0,
          message: MESSAGE.unable_to_create_user,
        });
      } else {
        return res.send({
          status: 1,
          message: MESSAGE.success,
          data: user,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 0,
      message: MESSAGE.unable_to_create_user,
    });
  }
};

module.exports.signIn = async (req, res) => {
  let data = req.body;
  try {
    let user = await authModel.signIn(data);

    if (!user) {
      return res.send({
        status: 0,
        message: MESSAGE.user_not_found,
      });
    } else {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = {
        time: Date(),
        userId: user.email,
      };

      const token = jwt.sign(data, jwtSecretKey, { expiresIn: "24h" });
      return res.send({
        status: 1,
        message: MESSAGE.success,
        data: user,
        token,
      });
    }
  } catch (err) {
    return res.send({
      status: 0,
      message: MESSAGE.unable_login,
      err,
    });
  }
};
