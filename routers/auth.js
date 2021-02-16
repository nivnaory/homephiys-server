
var express=require("express");
const { Mongoose } = require("mongoose");
var router=express.Router();
var passportTherapist=require("passport");
 Users = require("../models/users");
 Paitent=require("../models/paitent");
 Doctor=require("../models/doctor");
 Therapist=require("../models/therapist");
 TreatmentType=require("../models/treatmentType")
 
 router.post("/register/paitent/:id" ,async (req,res) => {
   const newPaitent=new Paitent(req.body);
   Doctor.findById(req.params.id,function (err,doctor)
  {
  if (err){
    res.json(err)
  }

  if(!checkValidUserName(req.body.username)){
    res.json("eror  new user")
    throw new Error('eror user name')
  }

// get treatment type as arry
 mongoose.connection.db.collection("TreatmentType", function(err, collection){
  collection.find({treatmentId:1}).toArray(function(err,treatmentType) {
    newPaitent.treatmentTypes.push(treatmentType[0]._id)
    
   });
   
});  
 
mongoose.connection.db.collection("Protocols", function(err, collection){
  collection.findOne({protocolId:1},function(err,newProtocol) {
        
       newPaitent.protocol=newProtocol._id
       
   });
  });

 
  doctor.paitents.push(newPaitent._id);
  doctor.save();
});
 const paitentRegister=  await Paitent.register(newPaitent,req.body.password)
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

