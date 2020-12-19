
var express=require("express");
const { Mongoose } = require("mongoose");
var router=express.Router();
var passportDoctor=require("passport");
var passportTherapist=require("passport");
const treatmentType = require("../models/treatmentType");
const paitent = require("../models/paitent");
 Users = require("../models/users");
 Paitent=require("../models/paitent");
 Doctor=require("../models/doctor");
 Therapist=require("../models/therapist");
 TreatmentType=require("../models/treatmentType")
 
// Create new Patient only for the doctor!//here we need to handle that the user name will by unique and also the password
router.post("/register/paitent/:id", async (req,res) =>{ 
       Doctor.findById(req.params.id,function (err,doctor)
      {
      if (err){
        res.json(err)
      }

      if(!checkValidUserName(req.body.username)){
        res.json("eror  new user")
        throw new Error('eror user name')
      }
   
     mongoose.connection.db.collection("TreatmentType", function(err, collection){
      collection.find({treatmentId:1}).toArray(function(err,treatmentType) {
        
        newPaitent.treatmentTypes.push(treatmentType[0]._id)
       });
       
    });   
      doctor.patients.push(newPaitent._id);
      doctor.save();
   });
   const newPaitent=new Paitent(req.body);
   const registerPaitent=await Paitent.register(newPaitent,req.body.password);
   res.json("register new user")

});
//Create new doctor 
router.post("/register/doctor",async (req,res)=>{
      if(!checkValidUserName(req.body.username)){
        res.json("eror  new user")
        throw new Error('eror user name')
      }
      const newDoctor=new Doctor(req.body)
      const doctorRegister= Doctor.register(newDoctor,req.body.password)
      res.json("register new doctor")
 })

//Create new threapist
router.post("/register/therapist",async(req,res)=>{
    if(!checkValidUserName(req.body.username)){
      res.json("eror  new user")
      throw new Error('eror user name')
    }
    const  newTherapist=new Therapist(req.body);
        const therapstRegister= await Therapist.register(newTherapist,req.body.password);
        console.log(therapstRegister)
        res.json("register new therapist")
})



router.post('/login/paitent', async function(req, res, next) {
  Paitent
.findOne({username:req.body.username,password:req.body.password})
.exec(function(err, paitent) {
    if (err) return handleError(err);
    if(!paitent){ 
    res.status(400).send();
    }
     //send the id to the flutter 

    res.status(200).send()

  });
});

//here we go to database and check if the doctor  exsist on the database 
router.post("/login/doctor",function(req,res,next){
  Doctor
  .findOne({username:req.body.username}).exec(function(err,doctor){
      if (err) return handleError(err);
      if(!doctor){
       res.json("docotor not found!");
      }
      res.json("doctor found succesfully!")
  });
});
//here we get the doctor from the login screed and check if exsist in the database
router.post("/login/therapist",(req,res,next)=>{
  passportTherapist.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) 
    { return res.status(401).send({ success : false, message : 'authentication failed' })};
    console.log("im here!!")
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success : true, message : 'authentication succeeded' });
    });      
  
  })(req, res, next);;
 });


//Delete User from doctor  only doctor can delete one of the user 
 router.delete("/paitent/:id",async(req,res) =>{
  Paitent.findByIdAndRemove(req.params.id,function(err){
    if (err){
     res.json("Paitent not found ")
    } 
     res.json("Paitnet deletd")
    })
 });
     module.exports = router;



     
//Check validation of username 
function checkValidUserName(username){
  let isnum = /^\d+$/.test(username);
  if(!isnum || username.length!=9)
    return false;

   return true;
}



 /*
   newtreatmentType.type=treatmentType[0].type
   newtreatmentType.treatmentId=treatmentType[0].treatmentId;
   newtreatmentType._id=treatmentType[0]._id
   treatmentType[0].stageList.forEach(function(item,index){
     const newStage=new Stage()
     newStage.currentLevel=item.currentLevel;
     treatmentType[0].stageList[index].exerciseList.forEach(function(item,index){
       const newExercise= new Exercise()
       newExercise.name=item.name
       newExercise.description=item.description
       newExercise.level=item.level
       newExercise.exerciseId=item.exerciseId
      
       treatmentType[0].stageList[index].exerciseList[index].questions.forEach(function(item,index){
         newExercise.questions.push(item)
         
       });
       newStage.exerciseList.push(newExercise)
   });
   newtreatmentType.stageList.push(newStage)
       
       newPaitent.treatmentTypes.push(treatmentType[0]._id)
       
  
      });
   });
   
   const registerPaitent=await Paitent.register(newPaitent,req.body.password);
   res.json("register new user")
});
*/