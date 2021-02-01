mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
const paitnet = require("./paitent");
const treatmentType =require("./treatmentType")

var ScoreSchema=new mongoose.Schema({
       exerciseId:Int16Array,
       highScore:Float32Array
    });
    module.exports=mongoose.model("Score",PaitentSchema);