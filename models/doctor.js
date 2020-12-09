mongoose=require("mongoose");
const { Collection } = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

//define User Entity
//need to decide if there is username
var DoctorSchema=new mongoose.Schema({
  username:String,
  password:String,
  name:String,
  paitents:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Paitent'
  }]},
  //collection:'Doctors'
  //need to add more attr here!\
   {collection : 'Doctors'});

DoctorSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Doctor",DoctorSchema);