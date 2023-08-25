var userModel = require("../services/user.services");
var MESSAGE = require("../config/response.messages");
const https = require("https");
const launches = require("../models/launches");
const request = require("request");

module.exports.getUsers = async (req, res) => {
  try {
    let userData = await userModel.getUsers();
    res.send({
      status: 1,
      message: MESSAGE.data_found,
      data: userData,
    });
  } catch {
    res.send({
      status: 0,
      message: MESSAGE.unable_to_get_user,
    });
  }
};

module.exports.insertData = async (req, ress) => {
  try {
    request(
      "https://api.spacexdata.com/v3/launches",
      { json: true },
      async (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        await launches.insertMany(body);
        return ress.send(body);
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports.filterLaunches = async (req, res) => {
  try {
    let reqObj = req.query;
    let match = {};
    let sort = {};
    let limit = 10;
    let agg = [];

    if (reqObj.type == "latest") {
      limit = 1;
      sort = {
        $sort: {
          launch_date_utc: -1,
        },
      };
      agg.push(sort);
    } else if (reqObj.type == "upcoming") {
      match = {
        $match: {
          launch_date_utc: {
            $gte: new Date().toISOString(),
          },
        },
      };
      console.log(match);
      agg.push(match);
      sort = {
        $sort: {
          launch_date_utc: 1,
        },
      };
      agg.push(sort);
    } else if (reqObj.type == "past") {
      match = {
        $match: {
          launch_date_utc: {
            $lt: new Date().toISOString(),
          },
        },
      };
      console.log(match);
      agg.push(match);
      sort = {
        $sort: {
          launch_date_utc: -1,
        },
      };
      agg.push(sort);
    } else {
      if (reqObj.from && reqObj.to) {
        match = {
          $match: {
            launch_date_utc: {
              $gte: new Date(req.query.from).toISOString(),
              $lt: new Date(req.query.to).toISOString(),
            },
          },
        };
        console.log(match);
        agg.push(match);
      }
    }
    limit = {
      $limit: limit,
    };
    agg.push({ $skip: parseInt(req.query.page) * 10 });
    agg.push(limit);
    console.log(new Date(req.query.from), new Date(req.query.to));
    let chatMessageAggregate = await launches.aggregate(agg);
    res.status(200).send({
      message: "Launches found sucessfully.",
      data: chatMessageAggregate,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};

module.exports.updateShip = async (req, ress) => {
  try {
    let updateData = {};
    let key = req.params.key || "AMERICANSPIRIT";
    request(
      "https://api.spacexdata.com/v3/ships/"+key,
      { json: true },
      async (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        console.log(body);
        console.log("key", key);
        let updateData = await launches.updateMany(
          { ships: key },
          {
            [key] : body
          },
        );
        console.log("updateData", updateData);

        return ress.send({
          message: "success",
        });
      }
    );
  } catch (error) {
    console.log("error", error);
    ress.status(500).send({
      message: "Something went wrong",
    });
  }
};
