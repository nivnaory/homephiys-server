mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
const therapist = require("./therapist");

//define User Entity
//need to decide if there is username
var PaitentSchema=new mongoose.Schema({
  username:String,
  password:String,
  //need to add more attr here!
});

PaitentSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Paitent",PaitentSchema);