mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const treatmentType = require("./treatmentType")

var ScoreSchema = new mongoose.Schema({
    exerciseId: Int16Array,
    highScore: Float32Array
});
module.exports = mongoose.model("Score", ScoreSchema);