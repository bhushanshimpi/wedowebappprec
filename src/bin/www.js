const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("../config/db");
const path = require("path");

/*Define Template */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*Routes Define goes here*/
const indexRoutes = require("../routes/index.routes");

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

/*Create Route Groups Here*/
app.use("/v1", indexRoutes);

/*End Route Groups Here*/
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;
