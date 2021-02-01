mongoose=require("mongoose");
//const therapist = require("./stage");
//define User Entity
var Exercisechema=new mongoose.Schema({
  name:String,
  description:String,
  level:Number,
  exerciseId:Number,
  urlAdress:String,
  questions:[{
      type:String
  }]
  //need to add also the video
});

var StageSchema=new mongoose.Schema({
  currentLevel:Number,
  exerciseList:[Exercisechema],
});
var TreatmentTypeSchema=new mongoose.Schema({
  type:String,
  treatmentId:Number,
  stageList:[
    StageSchema
]},
{collection : 'TreatmentType'});
//need to add more attr
module.exports=mongoose.model("TreatmentType",TreatmentTypeSchema);