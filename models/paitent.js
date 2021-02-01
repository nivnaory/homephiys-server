mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
const therapist = require("./therapist");

//define User Entity
//need to decide if there is username
var PaitentSchema=new mongoose.Schema({
  username:String,
  password:String,
  name:String,
  treatmentTypes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'TreatmentType'
  }],
  scoreList:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Score'
    }],
   },
  {collection : ' Paitents'});
  //need to add more attr here! highRecord,ScoreList,Access

PaitentSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Paitent",PaitentSchema);