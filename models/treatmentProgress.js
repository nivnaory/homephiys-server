/*
mongoose=require("mongoose");
const { Collection } = require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

//define User Entity
//need to decide if there is username
var ReportShcema=new mongoose.Schema({
  questions: [{
      type: String
  }],
 answers: [{
      type: Number
  }],
OpenAnswer:String,
stageLevel:Number,
exerciseLevel:Number,
});


var TreatmentProgressShcema=new mongoose.Schema({
  reports:[ReportShcema],
    //Graph
// {collection : 'Doctors'});
});

TreatmentProgressShcema.plugin(passportLocalMongoose);
module.exports=mongoose.model("TreatmentProgress",TreatmentProgressShcema);
*/