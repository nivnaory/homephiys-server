mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

//define User Entity
//need to decide if there is username
var DoctorSchema=new mongoose.Schema({
  username:String,
  password:String,
  //need to add more attr here!
});

DoctorSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Doctor",DoctorSchema);