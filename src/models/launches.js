const mongoose = require("mongoose");

const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const launchSchema = mongoose.Schema({
  ships: {
    type: [String],
  }
},{ strict: false });

const launches = mongoose.model("launch", launchSchema);
// launchSchema.plugin(aggregatePaginate)
module.exports = launches;
