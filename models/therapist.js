mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

//define User Entity
//need to decide if there is username
var TherapistSchema=new mongoose.Schema({
  username:String,
  password:String,
  //need to add more attr here!
});

TherapistSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Theraphist",TherapistSchema);