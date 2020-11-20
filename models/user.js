mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

//define User Entity
//need to decide if there is username
var UserSchema=new mongoose.Schema({
  username:String,
  password:String,
  //need to add more attr here!
});

UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);