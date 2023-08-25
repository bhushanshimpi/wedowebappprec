const mongoose = require("mongoose");
var CONFIG = require("./config");


mongoose.set("strictQuery", false);

console.log("CONFIG.mongo_db_ur", CONFIG.mongo_db_ur);
mongoose
  .connect(CONFIG.mongo_db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfully");
  })
  .catch((e) => {
    console.log(e);
  });

exports.mongoose;
