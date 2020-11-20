mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

//define User Entity
//need to decide if there is username
var TheraphistSchema=new mongoose.Schema({
  username:String,
  password:String,
  //need to add more attr here!
});

TheraphistSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Theraphist",TheraphistSchema);